const mongoose = require('mongoose');
require('dotenv').config();

const URL_MONGODB = process.env.MONGODB_URI;

const conectarMongoDB = async () => {
  try {
    if (!URL_MONGODB) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }
    
    await mongoose.connect(URL_MONGODB, {
      dbName: 'ludus'
    });
    console.log('✓ Conectado ao MongoDB (banco: ludus) com sucesso!');
  } catch (erro) {
    console.error('✗ Erro ao conectar ao MongoDB:', erro.message);
    process.exit(1);
  }
};

module.exports = conectarMongoDB;