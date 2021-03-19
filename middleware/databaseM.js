import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxIdleTimeMS:6000,
  connectTimeoutMS:6000,
  socketTimeoutMS:6000,
  maxTimeMS: 6000,
});

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
  const db = client.db('shopData');
  return { db, client };
}


export { connect }
