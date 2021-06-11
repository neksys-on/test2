import nextConnect from 'next-connect';
import { connect } from '../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');


export default async function (req, res) {

  const  {db} = await connect()

  const pushData = req.body.data
  const typeData = 'orders'

  const allData = await db.collection(`${typeData}`).findOne()
  const needData = await allData[typeData]
  let id = '1'
  if (needData.length > 0) {
   id = String(Number(needData[needData.length-1].id) + 1)
  }
  pushData.id = id

  let list_products = ''
  pushData.products.map((prod)=>{
    let param
    if (prod.params !== undefined) {
      param = ', Параметры: '+prod.params.param
    } else {
      param = ''
    }
    list_products = list_products+' \n '+'№'+ prod.id +', '+ prod.title + param +', Цена: '+ prod.price +', количество: '+ prod.value
  })
  const text_offer = ' ФИО: '+pushData.surname+' '+pushData.name+' '+pushData.patronymic+', тел.: '+pushData.telephone+', Населенный пункт: '+pushData.city+', адрес: '+pushData.address+', индекс: '+pushData.index+', Содержание: '+list_products
  const text = '№ заказа: '+pushData.id+' , Cумма заказа: '+pushData.totalPrice+' р. '+text_offer


  async function sendEmail( send_to , send_title , send_text ) {
    const email_API_URL = process.env.EMAIL_API_URL
    const responseEm = await fetch(email_API_URL, {
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
  }
  sendEmail( req.body.to , req.body.title , text)

  res.status(201)
  res.json({status: 'Complete'})
}
