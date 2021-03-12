import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

export default async function (req, res) {
  let pushData = req.body.doPush

  const jsonfordata = {
    id: "2",
    version: pushData,
  }

  fs.writeFile(`dataBase/dan.json`, JSON.stringify(jsonfordata), function (err) {
      if (err) {
          console.error(err);
      }
  });

  res.status(201)
  res.json({})
}
