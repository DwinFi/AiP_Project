var data = require("./data.js").data;
console.log(data);

// createDB.js
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'aviationDB';

async function main() {
  // Connect to server
  await client.connect();
  console.log('✔ Connected successfully to MongoDB');

  const db = client.db(dbName);
  const planes = db.collection('planes');

  // Documents to insert
  const docs = [
    {
      name: "БИ-1",
      image: "/images/bi.png",
      description: "Первый советский ракетный истребитель.",
      addedAt: new Date()
    },
    {
      name: "Horten Ho 229",
      image: "/images/ho229.png",
      description: "Немецкий реактивный самолёт «летающее крыло».",
      addedAt: new Date()
    },
    {
      name: "F-117 Nighthawk",
      image: "/images/f117.png",
      description: "Первый серийный стелс-самолёт США.",
      addedAt: new Date()
    }
  ];

  // Insert documents
  const insertResult = await planes.insertMany(docs);
  console.log('✔ Inserted documents =>', insertResult.insertedCount);

  // For demo: list inserted documents (optional)
  const all = await planes.find({}).toArray();
  console.log('Current documents in collection "planes":');
  all.forEach(doc => console.log('-', doc.name));

  return 'done';
}

main()
  .then(console.log)
  .catch(err => {
    console.error('Error in script:', err);
    process.exitCode = 1;
  })
  .finally(() => client.close());
