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

    needData = await allData[typeData]
    version_total = Number(dataDB_version)


    const FILE_PATH = `./dataBase/${typeData}.json`;


    const writeData = async () => {
      if (typeData === 'products') {
        const jsonfordata = {
          version: version_total,
          next_id: allData.next_id,
          [typeData]: needData
        }
        fs.writeFile(FILE_PATH, JSON.stringify(jsonfordata), function (err) {
            if (err) {
                console.error(err);
            }
        });
      } else {
        const jsonfordata = {
          version: version_total,
          [typeData]: needData
        }
        fs.writeFile(FILE_PATH, JSON.stringify(jsonfordata), function (err) {
            if (err) {
                console.error(err);
            }
        });
      }
    }
    writeData()



    res.status(201)
    res.json({})

  } catch(e) {
    res.status(501)
    res.json({error: 'Failure to work with the Database'})
  }
};
