import nextConnect from 'next-connect';
import { connect } from '../../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');


let dd2= [{
        url: '/HairСare.jpg',
        title: 'Уход за волосами',
        width: '32%',
        id: '1'
    }, {
        url: '/HairDye2.jpg',
        title: 'Краска для волос',
        width: '32%',
        id: '2'
    }, {
        url: '/cosmetics.jpg',
        title: 'Косметика',
        width: '32%',
        id: '3'
    }]

export default async function (req, res) {

  try {
    const id = req.body.id
    const whatChange = req.body.whatChange
    const newInfo = req.body.newInfo
    const typeData = req.body.type
    let needData
    let needData2 = []
    let needData3
    let version_total
    let version_total2
    let allData2
    const  {db} = await connect()

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

    if (whatChange === 'payment') {
      allData2 = await db.collection('products').findOne()
      let dataDB_version2 = allData2.version
      let res2 = await JSON.parse(fs.readFileSync(`./data/products.json`))
      let data_version2 = res2.version
      if (dataDB_version2 > data_version2) {
        needData3 = await allData2.products
        version_total2 = Number(dataDB_version2) + 1
      }
      else {
        needData3 = await res2.products
        version_total2 = Number(data_version2) + 1
      }
    }


    needData.map((data)=>{
      if (data.id === id) {
        if ((typeData === 'products')||(typeData === 'category')) {
          if (whatChange === 'title') {
            data.title = newInfo
          }
          if (whatChange === 'description') {
            data.description = newInfo
          }
          if (whatChange === 'url') {
            data.url = newInfo
          }
          if (whatChange === 'volume') {
            data.volume = newInfo
          }
          if (whatChange === 'typeVolume') {
            data.typeVolume = newInfo
          }
          if (whatChange === 'price') {
            data.price = newInfo
          }
          if (whatChange === 'value') {
            data.value = newInfo
          }
          if (whatChange === 'width') {
            data.width = newInfo
          }
          if (whatChange === 'category') {
            data.category = newInfo
          }
          if (whatChange === 'priceDiscount') {
            data.priceDiscount = newInfo
            if (newInfo === '') {
              data.sale = false
            } else {
              data.sale = true
            }
          }
        } // if type = product or category
        if (typeData === 'orders') {
          if (whatChange === 'track_number') {
            data.state.track_number = newInfo
          }

          if (whatChange === 'payment') {
            if (data.state.payment === 'Не оплачено') {
              data.state.payment = 'Оплачено'

              data.products.map((prod_in_order)=>{
                needData3.map((prod_global)=>{
                  if (prod_global.id === prod_in_order.id) {
                    prod_global.value -=prod_in_order.value

                  }
                })
              })

            } else {
              if (data.state.payment === 'Оплачено') { data.state.payment = 'Не оплачено' }
            }
          }

          if (whatChange === 'shipment') {
            if (data.state.shipment === 'Не отправлен') {
              data.state.shipment = 'Отправлен'
            } else {
              if (data.state.shipment === 'Отправлен') { data.state.shipment = 'Не отправлен' }
            }
          }
        } // if type = orders
      }
      needData2.push(data)
    })


    const writeData = async () => {
      const jsonfordata = {
        version: version_total,
        [typeData]: needData2
      }
      fs.writeFile(`./data/${typeData}.json`, JSON.stringify(jsonfordata), function (err) {
          if (err) {
              console.error(err);
          }
      });
      if (whatChange === 'payment') {
        const jsonfordata2 = {
          version: version_total2,
          products: needData3
        }
        fs.writeFile(`./data/products.json`, JSON.stringify(jsonfordata2), function (err) {
            if (err) {
                console.error(err);
            }
        });
      }
    }
    writeData()

    await db.collection(`${typeData}`).updateOne(
      { _id: allData._id },
      {$set:{
        "version": version_total,
        [typeData]: needData2
      }}
    )

    if (whatChange === 'payment') {
      await db.collection(`products`).updateOne(
        { _id: allData2._id },
        {$set:{
          "version": version_total2,
          products: needData3
        }}
      )
    }

    res.status(201)
    res.json({})

  } catch(e) {
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
};
