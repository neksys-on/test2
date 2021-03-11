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


    const allData = await db.collection(`${typeData}`).findOne()
    let dataDB_version = allData.version
    let res = await JSON.parse(fs.readFileSync(`./data/${typeData}.json`))
    let data_version = res.version
    if (dataDB_version > data_version) {
      needData = await allData[typeData]
      version_total = Number(dataDB_version) + 1
    }
    else {
      needData = await res[typeData]
      version_total = Number(data_version) + 1
    }


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
        let id
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
          let resStatistics = await JSON.parse(fs.readFileSync(`./data/statistics.json`))
          let data_version_Statistics = resStatistics.version
          if (dataDB_version_Statistics > data_version_Statistics) {
            needData_Statistics = await allDataStatistics.statistics
            version_total_Statistics = Number(dataDB_version_Statistics) + 1
          }
          else {
            needData_Statistics = await resStatistics.statistics
            version_total_Statistics = Number(data_version_Statistics) + 1
          }

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
            let res2 = await JSON.parse(fs.readFileSync(`./data/products.json`))
            let data_version2 = res2.version
            if (dataDB_version2 > data_version2) {
              needData4 = await allDataProd.products
            }
            else {
              needData4 = await res2.products
            }

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

        const writeData = async () => {
          if (typeData === 'products') {
            const jsonfordata = {
              version: version_total,
              next_id: String(Number(allData.next_id)+1),
              [typeData]: needData
            }
            fs.writeFile(`./data/${typeData}.json`, JSON.stringify(jsonfordata), function (err) {
                if (err) {
                    console.error(err);
                }
            });

            const jsonfordata3 = {
              version: version_total_Statistics,
              statistics: needData_Statistics
            }
            fs.writeFile(`./data/statistics.json`, JSON.stringify(jsonfordata3), function (err) {
                if (err) {
                    console.error(err);
                }
            });
          } else {
            const jsonfordata = {
              version: version_total,
              [typeData]: needData
            }
            fs.writeFile(`./data/${typeData}.json`, JSON.stringify(jsonfordata), function (err) {
                if (err) {
                    console.error(err);
                }
            });
          }

        }
        writeData()


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

      if (typeData === 'orders') {
        async function msgsend(doing, text) {
          const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3000'
          const response = await fetch(hostname+'/api/sendWhatsapp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              do: doing,
              text: text,
             }),
          })
          const data = await response.json()
          return data.doPush
        }

        let list_products = ''
        pushData.products.map((prod)=>{
          list_products = list_products+' \n '+'№'+ prod.id +', '+ prod.title +', Цена: '+ prod.price +', количество: '+ prod.value
        })
        const text_offer = ' ФИО: '+pushData.surname+' '+pushData.name+' '+pushData.patronymic+', тел.: '+pushData.telephone+', Населенный пункт: '+pushData.city+', адрес: '+pushData.address+', индекс: '+pushData.index+', Содержание: '+list_products
        const text = '№ заказа: '+pushData.id+' , Cумма заказа: '+pushData.totalPrice+' р. '+text_offer
        msgsend('connect', text)
      }

      res.status(201)
      res.json({})




  } catch(e) {
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
};
