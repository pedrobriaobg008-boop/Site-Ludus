const mongoose = require('mongoose');
require('dotenv').config({ override: true });

const URL_MONGODB = process.env.MONGODB_URI;
let conexaoPromise = null;

const conectarMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (conexaoPromise) {
    return conexaoPromise;
  }

  try {
    if (!URL_MONGODB) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }

    conexaoPromise = mongoose.connect(URL_MONGODB, {
      dbName: 'ludus'
    });

    await conexaoPromise;
    console.log('✓ Conectado ao MongoDB (banco: ludus) com sucesso!');

    return mongoose.connection;
  } catch (erro) {
    conexaoPromise = null;
    console.error('✗ Erro ao conectar ao MongoDB:', erro.message);
    throw erro;
  }
};

module.exports = conectarMongoDB;