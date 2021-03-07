import nextConnect from 'next-connect';
import middleware from '../../../middleware/database.js';
import { connect } from '../../../middleware/databaseM.js';



export default async function (req, res) {
  try {
    const typeData = req.body.type
    const  {db} = await connect()

    if (typeData === 'category') {
      const data = await db.collection('category').findOne()
      res.status(201)
      res.json(data)
    }
    if (typeData === 'products') {
      const data = await db.collection('products').findOne()
      res.status(201)
      res.json(data)
    }
    if (typeData === 'orders') {
      const data = await db.collection('orders').findOne()
      res.status(201)
      res.json(data)
    }

  }
  catch(e) {
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
}
