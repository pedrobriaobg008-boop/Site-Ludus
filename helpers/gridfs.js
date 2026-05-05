const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

let bucket = null;

// Inicializar bucket quando conexão estiver pronta
const initGridFS = (connection) => {
  if (connection.readyState === 1) {
    const db = connection.getClient().db('ludus');
    bucket = new GridFSBucket(db, {
      bucketName: 'media_files'
    });
    console.log('✓ GridFS inicializado');
  }
};

// Download de arquivo do GridFS
const downloadFromGridFS = async (fileId) => {
  if (!bucket) {
    throw new Error('GridFS não inicializado');
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    downloadStream.on('error', reject);
  });
};

const getBucket = () => bucket;

const getGridFSFileInfo = async (fileId) => {
  if (!bucket) {
    throw new Error('GridFS não inicializado');
  }

  return new Promise((resolve, reject) => {
    bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray((error, files) => {
      if (error) return reject(error);
      resolve(files[0] || null);
    });
  });
};

module.exports = {
  initGridFS,
  downloadFromGridFS,
  getBucket,
  getGridFSFileInfo
};
