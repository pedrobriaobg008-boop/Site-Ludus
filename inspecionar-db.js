const mongoose = require('mongoose');

const URL_MONGODB = 'mongodb+srv://Aluno:***REMOVED***@cluster0.9ekdn5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function inspecionarDados() {
  try {
    console.log('🔄 Conectando ao MongoDB...');
    await mongoose.connect(URL_MONGODB);
    console.log('✓ Conectado!\n');

    // Buscar um documento de jogos sem esquema específico
    const db = mongoose.connection.db;
    
    // Listar coleções
    const colecoes = await db.listCollections().toArray();
    console.log('📚 Coleções no banco de dados:');
    colecoes.forEach(col => console.log(`   - ${col.name}`));

    // Inspecionar a coleção 'jogos'
    console.log('\n📋 Inspecionando coleção "jogos":');
    const jogoCollection = db.collection('jogos');
    const jogos = await jogoCollection.find({}).limit(2).toArray();
    
    if (jogos.length > 0) {
      console.log(`\n✓ Documento encontrado:`);
      console.log(JSON.stringify(jogos[0], null, 2));
    } else {
      console.log('✗ Nenhum documento encontrado na coleção "jogos"');
    }

    // Inspecionar a coleção 'Jogo' (maiúscula)
    console.log('\n📋 Inspecionando coleção "Jogo":');
    const JogoCollection = db.collection('Jogo');
    const JogosCapital = await JogoCollection.find({}).limit(2).toArray();
    
    if (JogosCapital.length > 0) {
      console.log(`\n✓ Documento encontrado:`);
      console.log(JSON.stringify(JogosCapital[0], null, 2));
    } else {
      console.log('✗ Nenhum documento encontrado na coleção "Jogo"');
    }

    process.exit(0);
  } catch (erro) {
    console.error('✗ Erro:', erro.message);
    process.exit(1);
  }
}

inspecionarDados();
