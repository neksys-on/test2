import nextConnect from 'next-connect';
import { connect } from '../../../middleware/databaseM.js';
import { NextApiRequest, NextApiResponse } from 'next';
import {objectId} from 'mongodb';
const fs = require('fs');


export default async function (req, res) {
  try {
    const id = req.body.id
    const typeData = req.body.type
    let needData
    let version_total
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

      let needData2 = []
      needData.map((data)=>{
        if (data.id === id) {
        }
        else {
          needData2.push(data)
        }
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
      }
      writeData()

      const result = await db.collection(`${typeData}`).updateOne(
        { _id: allData._id },
        {$set:{
          "version": version_total,
          [typeData]: needData2
        }}
      )

      res.status(201)
      res.json({})
    


  } catch(e) {
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
};
