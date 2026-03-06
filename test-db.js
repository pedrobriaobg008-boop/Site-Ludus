const mongoose = require('mongoose');
const Jogo = require('./models/jogos');

const URL_MONGODB = 'mongodb+srv://Aluno:***REMOVED***@cluster0.9ekdn5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function testarConexao() {
  try {
    console.log('🔄 Conectando ao MongoDB...');
    await mongoose.connect(URL_MONGODB);
    console.log('✓ Conectado com sucesso!');

    console.log('\n📊 Buscando jogos no banco de dados...');
    const jogos = await Jogo.find().limit(5);
    
    console.log(`\n✓ Encontrados ${jogos.length} jogos:`);
    jogos.forEach((jogo, index) => {
      console.log(`\n${index + 1}. ${jogo.nome}`);
      console.log(`   - ID: ${jogo._id}`);
      console.log(`   - Descrição: ${jogo.descricao?.substring(0, 50)}...`);
      console.log(`   - Tags: ${jogo.tags?.join(', ') || 'N/A'}`);
    });

    console.log('\n✓ Teste concluído com sucesso!');
    process.exit(0);
  } catch (erro) {
    console.error('✗ Erro:', erro.message);
    process.exit(1);
  }
}

testarConexao();
