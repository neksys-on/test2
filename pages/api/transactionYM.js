import nextConnect from 'next-connect';
import { connect } from '../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');

export default async (req, res) => {
  console.log(req.body)
  let needData

// if (req.body.notification_type === 'card-incoming' || req.body.notification_type === 'p2p-incoming')
  if ( req.body.notification_type ) { // оплата расчитанна на юмани

    const idOffer = req.body.label // const idOffer = req.body.label

    const  {db} = await connect()

    const ordersData = await db.collection(`orders`).findOne()
    let dataDB_version = ordersData.version
    needData = await ordersData.orders

    let message_discription = ''

    needData.map(order => {
      if (order.id === idOffer) {

        order.state.payment = 'Оплачено'
        if (order.state.summ_payment) {
          order.state.summ_payment = Number(order.state.summ_payment)+Number(req.body.withdraw_amount) // order.state.summ_payment += req.body.withdraw_amount
        } else {
          order.state.summ_payment = Number(req.body.withdraw_amount) // order.state.summ_payment = req.body.withdraw_amount
        }
        if (order.totalPrice !== Number(req.body.withdraw_amount)) {
          // Если сумма необходимая к оплате и сумма списанная со счета отправителя не равны, так же сумма всех платежей по оплате заказа записывается в summ_payment
          // console.log(order.totalPrice + ' !== ' + req.body.withdraw_amount)
          console.log('сумма оплаты '+ Number(req.body.withdraw_amount))
          console.log('Сумма оплаты не соответствует сумме заказа')
          const over = Number(req.body.withdraw_amount) - Number(order.totalPrice)
          if (over > 0) {
            console.log('Оплата ниже суммы заказа')
            message_discription = 'Пришедшая сумма оплаты ВЫШЕ суммы заказа! Сумма заказа:' + order.totalPrice + '. Поступившая сумма оплаты:' + req.body.withdraw_amount + '. Сумма всех оплат за этот заказ составляет:' + order.state.summ_payment + '. Способ доставки не определен.'
          }
          if (over < 0) {
            console.log('Оплата ниже суммы заказа')
            message_discription = 'Пришедшая сумма оплаты НИЖЕ суммы заказа! Сумма заказа:' + order.totalPrice + '. Поступившая сумма оплаты:' + req.body.withdraw_amount + '. Сумма всех оплат за этот заказ составляет:' + order.state.summ_payment + '. Способ доставки не определен.'
          }
          if (over === 350) {
            order.state.delivery = '1'
            message_discription = 'Выбранный способ доставки: "Энергия, ДВ регион"'
          }
          if (over === 800) {
            order.state.delivery = '2'
            message_discription = 'Выбранный способ доставки: "Энергия, Все регионы России"'
          }
          if (over === 550) {
            order.state.delivery = '3'
            message_discription = 'Выбранный способ доставки: "Почта России, Все регионы России"'
          }
          if (over === 500) {
            order.state.delivery = '4'
            message_discription = 'Выбранный способ доставки: "СДЭК без курьера, Все регионы России"'
          }
          if (over === 1200) {
            order.state.delivery = '5'
            message_discription = 'Выбранный способ доставки: "СДЭК с курьером до адреса, Все регионы России"'
          }
          if (over === 0) {
            // order.state.delivery = 6
            message_discription = 'Сумма оплаты равна сумме заказа, способ доставки не выбран.'
          }
        }

        if (order.state.sender) {
          order.state.sender.push(req.body.sender) // order.state.sender.push(req.body.sender)
        } else {
          order.state.sender = [req.body.sender] // order.state.sender = [req.body.sender]
        }

        console.log(order.state)

      }
    })

    const text = 'Поступила оплата по заказу №' + idOffer + ' . ' + message_discription

    try{
      async function telegram_send(text) {
        const telegramAPI_URL = 'https://bestjap.ru/api/telegram' //  `${process.env.NEXTAUTH_URL}api/telegram`
        const responseTelegram = await fetch(telegramAPI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
           }),
        })
        const resTelegram = await responseTelegram.json()
        return resTelegram
      }

      const res2 = await telegram_send(text)
    } catch(e){
      console.log(e)
    }


    try{
      async function sendEmail( send_to , send_title ,  send_text) {
        const emailAPI_URL = 'https://bestjap.ru/api/sendEmail_directly'
        const responseEmail = await fetch(emailAPI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: send_to,
            title: send_title,
            text: send_text,
           }),
        })
        const resEmail = await responseEmail.json()
        return resEmail
      }

      const res3 = await sendEmail('nikxabarovsk0000@gmail.com' , `Оплата по заказу №${idOffer}` , text)
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
  }

  res.status(200).json({})
  // res.status(200).json({ name: 'John Doe' })
}
