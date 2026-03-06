const mongoose = require('mongoose');

const URL_MONGODB = 'mongodb+srv://Aluno:***REMOVED***@cluster0.9ekdn5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function verificar() {
  try {
    await mongoose.connect(URL_MONGODB);
    const db = mongoose.connection.db;
    
    // Coleção Jogo
    console.log('=== COLECAO JOGO ===');
    const colJogo = db.collection('Jogo');
    const docsJogo = await colJogo.find({}).limit(1).toArray();
    if (docsJogo.length > 0) {
      console.log('Campos do documento Jogo:');
      console.log(Object.keys(docsJogo[0]));
      console.log('Primeiro doc:', docsJogo[0]);
    } else {
      console.log('Nenhum documento em Jogo');
    }
    
    // Coleção jogos
    console.log('\n=== COLECAO jogos ===');
    const colJogos = db.collection('jogos');
    const docsJogos = await colJogos.find({}).limit(1).toArray();
    if (docsJogos.length > 0) {
      console.log('Campos do documento jogos:');
      console.log(Object.keys(docsJogos[0]));
    } else {
      console.log('Nenhum documento em jogos');
    }
    
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

verificar();
