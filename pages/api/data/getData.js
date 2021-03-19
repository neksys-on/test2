import nextConnect from 'next-connect';
import middleware from '../../../middleware/database.js';
import { connect } from '../../../middleware/databaseM.js';



export default async function (req, res) {
  const typeData = req.body.type
  const  {db, client} = await connect()
  try {
    const data = await db.collection(`${typeData}`).findOne()
    res.status(201)
    res.json(data)

  }
  catch(e) {
    client.close()
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
  finally {

  }
}
