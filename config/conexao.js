const mongoose = require('mongoose');

const URL_MONGODB = 'mongodb+srv://Aluno:***REMOVED***@cluster0.9ekdn5x.mongodb.net/ludus?retryWrites=true&w=majority&appName=Cluster0';

const conectarMongoDB = async () => {
  try {
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