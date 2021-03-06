import nextConnect from 'next-connect';
import { connect } from '../../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');



export default async function (req, res) {
try {
    let pushData = req.body.doPush
    const typeData = req.body.type
    const  {db} = await connect()
    let needData
    let version_total
    let allDataStatistics
    let needData_Statistics
    let version_total_Statistics
    let needData4
    let id = 0

    const allData = await db.collection(`${typeData}`).findOne()
    let dataDB_version = allData.version
    needData = await allData[typeData]
    version_total = Number(dataDB_version) + 1



      let duplicate = false
      if ((typeData === 'products')||(typeData === 'category')) {
        needData.map((data)=>{
          if (data.title === pushData.title) {
            duplicate = true
            return console.log('Такое название уже существует')
          }
        })
      }

      if (!duplicate) {

        if (typeData === 'products') {
          id = String(Number(allData.next_id))
        }
        else {
          if (needData.length > 0) {
           id = String(Number(needData[needData.length-1].id) + 1)
          }
          else {
           id = '1'
          }
        }

        pushData.id = id
        if (typeData === 'orders') {
          pushData.state = {
            payment: 'Не оплачено',
            shipment: 'Не отправлен',
            track_number: ''
          }

          pushData.time = {
            date: new Date().getDate(),
            mounth: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
          }
        }
        if (typeData === 'products') {
          if (pushData.priceDiscount === '') {
            pushData.sale = false
          } else {
            pushData.sale = true
          }
        }

        needData.push(pushData)

        if (typeData === 'products') {
          let year= new Date().getFullYear()
          let mounth= new Date().getMonth()+1
          let price

          allDataStatistics = await db.collection('statistics').findOne()
          let dataDB_version_Statistics = allDataStatistics.version
          needData_Statistics = await allDataStatistics.statistics
          version_total_Statistics = Number(dataDB_version_Statistics) + 1

          if (needData_Statistics[year][mounth] === undefined) {
            needData_Statistics[year][mounth] = {
              coming: [],
              write_off: [],
              expense: [],
              initial_state: [],
              final_state: []
            }

            const allDataProd = await db.collection('products').findOne()
            let dataDB_version2 = allDataProd.version
            needData4 = await allDataProd.products

            needData_Statistics[year][mounth].initial_state = needData4
          } // needData_Statistics[year][mounth] === undefined

          pushData.sale ? price = pushData.priceDiscount : price = pushData.price
          needData_Statistics[year][mounth].coming.push({
            id: pushData.id,
            title: pushData.title,
            state_of_prices: [
              {value: pushData.value, price: price}
            ]
          })


        }



        if (typeData === 'products') {
          const result = await db.collection(`${typeData}`).updateOne(
            { _id: allData._id },
            {$set:{
              "version": version_total,
              "next_id": String(Number(allData.next_id)+1),
              [typeData]: needData
            }}
          )

          await db.collection(`statistics`).updateOne(
            { _id: allDataStatistics._id },
            {$set:{
              "version": version_total_Statistics,
              statistics: needData_Statistics
            }}
          )
        } else {
          const result = await db.collection(`${typeData}`).updateOne(
            { _id: allData._id },
            {$set:{
              "version": version_total,
              [typeData]: needData
            }}
          )
        }


      }

      let text = ''

      if (typeData === 'orders') {

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
        text = '№ заказа: '+pushData.id+' , Cумма заказа: '+pushData.totalPrice+' р. '+text_offer

      }

      res.status(201)
      res.json({status: 'Complete', id: id, text: text })

    } catch(e) {
      res.status(501)
      res.json({error: 'Failure to work with the Database'})
    }


};
