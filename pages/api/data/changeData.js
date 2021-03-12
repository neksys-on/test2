import nextConnect from 'next-connect';
import { connect } from '../../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');



export default async function (req, res) {
    const id = req.body.id
    const whatChange = req.body.whatChange
    const newInfo = req.body.newInfo
    const typeData = req.body.type


    let needData
    let needData2 = []
    let needData3
    let needData4
    let needData_Statistics
    let allDataStatistics
    let version_total
    let version_total2
    let version_total_Statistics
    let allData2
    let needAdd = true
    let change_value = false
    let difference_value
    let type_difference_value
    let changes_product
    let purchase_content = []
    const  {db} = await connect()

  try {

    const allData = await db.collection(`${typeData}`).findOne()
    let dataDB_version = allData.version
    let resWeb = await JSON.parse(fs.readFileSync(`./data/${typeData}.json`))
    let data_version = resWeb.version
    if (dataDB_version > data_version) {
      needData = await allData[typeData]
      version_total = Number(dataDB_version) + 1
    }
    else {
      needData = await resWeb[typeData]
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
        if (typeData === 'usersData') {
          data = newInfo
          needAdd = false
        }
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
            change_value = true
            changes_product = data
            difference_value = newInfo - data.value
            type_difference_value = 'admin'
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
                    change_value = true
                    purchase_content.push(prod_in_order)
                    type_difference_value = 'selling'
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

    if (typeData === 'usersData') {
      if (needAdd) {
        let id
        if (needData.length > 0) {
         id = String(Number(needData[needData.length-1].id) + 1)
        }
        else {
          id = 1
        }
        newInfo.id = id
        needData2.push(newInfo)
      }
    }






    if (change_value) {
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
        let res3 = await JSON.parse(fs.readFileSync(`./data/products.json`))
        let data_version2 = res3.version
        if (dataDB_version2 > data_version2) {
          needData4 = await allDataProd.products
        }
        else {
          needData4 = await res3.products
        }

        needData_Statistics[year][mounth].initial_state = needData4
      } // needData_Statistics[year][mounth] === undefined


      if (type_difference_value === 'admin') {

        let process
        difference_value > 0 ? process = 'coming' : process = 'write_off'
        difference_value < 0 ? difference_value *=-1 : difference_value = difference_value

        if (needData_Statistics[year][mounth][process].length > 0) {
          let found = false
          needData_Statistics[year][mounth][process].map((item)=>{
            if (item.id === changes_product.id) {
              found = true
              changes_product.sale ? price = changes_product.priceDiscount : price = changes_product.price
              let haveItem = false
              item.state_of_prices.map((item_state)=>{
                if (item_state.price === price) {
                  haveItem = true
                  item_state.value+=difference_value
                }

              })
              if (!haveItem) {
                item.state_of_prices.push({value: difference_value, price: price})
              }
            }
          })
          if (!found) {
            changes_product.sale ? price = changes_product.priceDiscount : price = changes_product.price
            needData_Statistics[year][mounth][process].push({
              id: changes_product.id,
              title: changes_product.title,
              state_of_prices: [
                {value: difference_value, price: price}
              ]
            })
          }
        } else {
          changes_product.sale ? price = changes_product.priceDiscount : price = changes_product.price
          needData_Statistics[year][mounth][process].push({
            id: changes_product.id,
            title: changes_product.title,
            state_of_prices: [
              {value: difference_value, price: price}
            ]
          })
        }

      }
      if (type_difference_value === 'selling') {
        if (needData_Statistics[year][mounth].expense.length > 0) {
          purchase_content.map((prod)=>{
            let needPush = true
            prod.sale === 'true' ? price = prod.priceDiscount : price = prod.price
            needData_Statistics[year][mounth].expense.map((prod_in_data)=>{
              if (prod.id === prod_in_data.id) {
                needPush = false
                let haveItem = false
                prod_in_data.state_of_prices.map((item_state)=>{
                  if (item_state.price === price) {
                    haveItem = true
                    item_state.value+=prod.value
                  }
                })
                if (!haveItem) {
                  prod_in_data.state_of_prices.push({value: prod.value, price: price})
                }
              }
            })
            if (needPush) {
              needData_Statistics[year][mounth].expense.push({
                id: prod.id,
                title: prod.title,
                state_of_prices:[{value: prod.value, price: price}]
              })
            }
          })
        } else {
          purchase_content.map((prod)=>{
            prod.sale === 'true' ? price = prod.priceDiscount : price = prod.price
            needData_Statistics[year][mounth].expense.push({
              id: prod.id,
              title: prod.title,
              state_of_prices:[{value: prod.value, price: price}]
            })
          })
        }
      }
    }




    const writeData = async () => {
      if (typeData === 'products') {
        const jsonfordata = {
          version: version_total,
          next_id: allData.next_id,
          [typeData]: needData2
        }
        fs.writeFile(`./data/${typeData}.json`, JSON.stringify(jsonfordata), function (err) {
            if (err) {
                console.error(err);
            }
        });
      } else {
        const jsonfordata = {
          version: version_total,
          [typeData]: needData2
        }
        fs.writeFile(`./data/${typeData}.json`, JSON.stringify(jsonfordata), function (err) {
            if (err) {
                console.error(err);
            }
        });
      }

      if (whatChange === 'payment') {
        const jsonfordata2 = {
          version: version_total2,
          next_id: allData2.next_id,
          products: needData3
        }
        fs.writeFile(`./data/products.json`, JSON.stringify(jsonfordata2), function (err) {
            if (err) {
                console.error(err);
            }
        });
      }
      if (change_value) {
        const jsonfordata3 = {
          version: version_total_Statistics,
          statistics: needData_Statistics
        }
        fs.writeFile(`./data/statistics.json`, JSON.stringify(jsonfordata3), function (err) {
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

    if (change_value) {
      await db.collection(`statistics`).updateOne(
        { _id: allDataStatistics._id },
        {$set:{
          "version": version_total_Statistics,
          statistics: needData_Statistics
        }}
      )
    }



    res.status(201)
    res.json({})

  } catch(e) {
    res.status(501)
    res.json({error: 'Failure to work with the Database'})
  }
};
