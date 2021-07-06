import nextConnect from 'next-connect';
import { connect } from '../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');

export default async (req, res) => {
  console.log(req.body)
  let needData

  if ( req.body.notification_type === 'card-incoming' || req.body.notification_type === 'p2p-incoming') { // оплата расчитанна на юмани

    const idOffer = req.body.label // const idOffer = req.body.label

    const  {db} = await connect()

    const ordersData = await db.collection(`orders`).findOne()
    let dataDB_version = ordersData.version
    needData = await ordersData.orders



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
        }

        if (order.state.sender) {
          order.state.sender.push(req.body.sender) // order.state.sender.push(req.body.sender)
        } else {
          order.state.sender = [req.body.sender] // order.state.sender = [req.body.sender]
        }

        console.log(order.state)

      }
    })

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
