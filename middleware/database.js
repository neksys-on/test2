import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxIdleTimeMS:6000,
  connectTimeoutMS:6000,
  socketTimeoutMS:6000,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('shopData');
  return next();
}

const middleware = nextConnect();
middleware.use(database);
export default middleware;
