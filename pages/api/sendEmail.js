import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');


export default async function (req, res) {


  const pushData = req.body.data

  pushData.id = req.body.id

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
  const text_offer = ' ФИО: '+pushData.surname+' '+pushData.name+' '+pushData.patronymic+', тел.: '+pushData.telephone+', email: '+pushData.email+', Населенный пункт: '+pushData.city+', адрес: '+pushData.address+', индекс: '+pushData.index+', Содержание: '+list_products+', Комментарий: '+pushData.comments
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
