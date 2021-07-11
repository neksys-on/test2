import nextConnect from 'next-connect';
import { connect } from '../../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');

export default async (req, res) => {
  const idOffer = req.body.id
  const metod = req.body.metod
  let needData
  const  {db} = await connect()

  const ordersData = await db.collection(`orders`).findOne()
  let dataDB_version = ordersData.version
  needData = await ordersData.orders


    needData.map(order => {
      if (order.id === idOffer) {
        order.state.delivery = metod
      }
    })

    let text = ''
    if (metod === '6') { // СДЭК наложенным платежом
      text = 'Для заказа №'+idOffer+' выбран способ доставки: СДЭК наложенным платежом, оплата по факту получения посылки в СДЭК.'
    }

    // try{
    //   function msgsend(doing, textMsg, from_phone_number, to_phone_number) {
    //     const whatsApp_URL = process.env.WHATSAPP_URL
    //     fetch(whatsApp_URL, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         do: doing,
    //         text: textMsg,
    //         from: from_phone_number,
    //         to: to_phone_number,
    //        }),
    //     })
    //   }
    //
    //   // console.log(text)
    //
    //   msgsend('send', text, '+79673055577', ['+79147730000','+79144061391'])
    // } catch(e){
    //   console.log(e)
    // }

    try{
      function telegram_send(text) {
        const telegramAPI_URL = `${process.env.NEXTAUTH_URL}api/telegram` //  `${process.env.NEXTAUTH_URL}api/telegram`
        fetch(telegramAPI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
           }),
        })
      }

      telegram_send(text)
    } catch(e){
      console.log(e)
    }



    try{
      function sendEmail( send_to , send_title ,  data) {
        const emailAPI_URL = `${process.env.NEXTAUTH_URL}api/sendEmail` //  `${process.env.NEXTAUTH_URL}api/telegram`
        fetch(emailAPI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: send_to,
            title: send_title,
            data: data,
           }),
        })
      }

      sendEmail('nikxabarovsk0000@gmail.com' , 'Заказ наложенным платежом' , text)
    } catch(e){
      console.log(e)
    }


    await db.collection(`orders`).updateOne(
      { _id: ordersData._id },
      {$set:{
        "version": ordersData.version,
        "orders": needData
      }}
    )


  res.status(200).json({status: 'Complete'})
  // res.status(200).json({ name: 'John Doe' })
}
