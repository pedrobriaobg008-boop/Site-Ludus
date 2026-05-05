/* Migrate Cloudinary PDFs to GridFS

Usage:
  node scripts/migrate-cloudinary-to-gridfs.js

Make sure .env has MONGODB_URI set and the app is NOT running.
This script will:
 - find documents in 'conteudorelacionados' with pdf_url and without pdf_id
 - download the remote PDF
 - upload it to GridFS bucket 'media_files'
 - update the document setting pdf_id to the new GridFS file id

Backup your DB before running.
*/

require('dotenv').config();
const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');
const https = require('https');
const http = require('http');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  await mongoose.connect(MONGODB_URI, { dbName: 'ludus' });
  console.log('Connected to MongoDB');
  const db = mongoose.connection.getClient().db('ludus');
  const bucket = new GridFSBucket(db, { bucketName: 'media_files' });
  const Conteudo = mongoose.model('ConteudoRelacionado', new mongoose.Schema({}, { strict: false, collection: 'conteudorelacionados' }));

  const cursor = Conteudo.find({ pdf_url: { $exists: true, $ne: null }, pdf_id: { $exists: false } }).cursor();
  let count = 0;
  for await (const doc of cursor) {
    try {
      console.log('Migrating:', doc._id.toString(), doc.titulo || '');
      const url = doc.pdf_url;
      const buffer = await downloadBuffer(url);
      const filename = (doc.titulo || 'conteudo').replace(/[^a-z0-9.-]/gi, '_') + '.pdf';

      const uploadStream = bucket.openUploadStream(filename, { contentType: 'application/pdf', metadata: { migratedFrom: url } });
      uploadStream.end(buffer);

      const fileId = await new Promise((resolve, reject) => {
        uploadStream.on('finish', () => resolve(uploadStream.id));
        uploadStream.on('error', reject);
      });

      await Conteudo.updateOne({ _id: doc._id }, { $set: { pdf_id: fileId } });
      console.log(' -> Migrated to GridFS id:', fileId.toString());
      count++;
    } catch (err) {
      console.error('Failed migrating', doc._id.toString(), err.message);
    }
  }

  console.log('Done. Migrated', count, 'documents.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
