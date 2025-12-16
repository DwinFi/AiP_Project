const { MongoClient } = require('mongodb');
const data = require('./data.js').data;

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db('aviationDB');
  const collection = db.collection('planes');

  await collection.deleteMany({});
  await collection.insertMany(data);

  console.log('✔ База обновлена');
  await client.close();
}

main().catch(console.error);