const { MongoClient } = require('mongodb');
var data = require("./data.js").data;

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'aviationDB';

async function main() {
  // Connect to MongoDB
  await client.connect();
  console.log('✔ Connected successfully to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection('planes'); // коллекция самолётов

  // Вставляем ВСЁ из data.js
  const insertResult = await collection.insertMany(data);
  console.log('✔ Inserted documents =>', insertResult.insertedCount);

  return 'done';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
