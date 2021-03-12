import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
import path from 'path'

export default async function (req, res) {
  let pushData = req.body.doPush

  const jsonfordata = {
    id: "2",
    version: pushData,
  }

  const postsDirectory = path.join(process.cwd(), 'pages/api/dataBase')
  const filePath = path.join(postsDirectory, 'dan.json')
  const filePath2 = path.join(postsDirectory, 'dan2.json')
  let resWeb
  try {
    resWeb = await JSON.parse(fs.readFileSync(filePath2))
    fs.writeFile(filePath, JSON.stringify(jsonfordata), function (err) {
        if (err) {
            console.error(err);
        }
    });
    fs.unlink(filePath2, function (err) {
        if (err) {
            console.error(err);
        }
    })
  } catch(e) {
    resWeb = await JSON.parse(fs.readFileSync(filePath))
    fs.writeFile(filePath2, JSON.stringify(jsonfordata), function (err) {
        if (err) {
            console.error(err);
        }
    });
    fs.unlink(filePath, function (err) {
        if (err) {
            console.error(err);
        }
    })
  }


  res.status(201)
  res.json({})
}
