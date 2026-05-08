const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const URL = process.env.MONGODB_URI;
const DB_NAME = 'ludus';

if (!URL) {
  console.error('MONGODB_URI não encontrada em .env');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function bsonReplacer(key, value) {
  if (value && value._bsontype === 'ObjectID') return value.toString();
  return value;
}

async function run() {
  try {
    await mongoose.connect(URL, { dbName: DB_NAME });
    const db = mongoose.connection.db;
    console.log('Conectado ao MongoDB para backup.');

    const cols = await db.listCollections().toArray();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    for (const c of cols) {
      const name = c.name;
      console.log('Exportando coleção', name);
      const docs = await db.collection(name).find({}).toArray();
      const filePath = path.join(outDir, `${name}-${timestamp}.json`);
      fs.writeFileSync(filePath, JSON.stringify(docs, bsonReplacer, 2));
      console.log(` -> ${filePath} (${docs.length} docs)`);
    }

    console.log('Backup concluído.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Erro durante backup:', err);
    process.exit(2);
  }
}

run();
