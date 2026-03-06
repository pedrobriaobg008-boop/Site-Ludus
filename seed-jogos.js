const mongoose = require('mongoose');

const URL_MONGODB = 'mongodb+srv://Aluno:123@cluster0.9ekdn5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Dados dos jogos educacionais
const jogosEducacionais = [
  {
    titulo: 'Mundo das Cores',
    descricao: 'Aprenda sobre cores de forma divertida e interativa. Ideal para desenvolver habilidades visuais e cognitivas.',
    descricaoCompleta: 'O aplicativo "Mundo das Cores" é desenvolvido para auxiliar crianças no estudo das cores de forma lúdica e interativa. Utilizando recursos visuais, vídeos e atividades práticas, o app permite benefícios como acessibilização de forma pedagógica e interativa.',
    icone: '🎨',
    background: '#FFE4E1',
    tags: ['Arte', 'Linguagens'],
    genero: 'Educacional',
    identificacao_unity: 'mundo-das-cores'
  },
  {
    titulo: 'Aventura dos Números',
    descricao: 'Explore o mundo dos números com atividades lúdicas e acessíveis para todas as crianças.',
    descricaoCompleta: 'A "Aventura dos Números" proporciona uma jornada educacional através dos dígitos e operações matemáticas básicas. Com interfaces simples e feedback claro, as crianças desenvolvem conceitos numéricos de forma segura e estimulante.',
    icone: '🔢',
    background: '#E0F2FE',
    tags: ['Matemática'],
    genero: 'Educacional',
    identificacao_unity: 'aventura-numeros'
  },
  {
    titulo: 'Reino Animal',
    descricao: 'Conheça os animais e seus habitats através de jogos educacionais e ilustrações amigáveis.',
    descricaoCompleta: 'O "Reino Animal" oferece uma experiência de aprendizado sobre biodiversidade. Com imagens detalhadas, sons naturais e atividades interativas, as crianças exploram características de diversos animais e seus ecossistemas.',
    icone: '🦁',
    background: '#E8F5E9',
    tags: ['Ciências da Natureza'],
    genero: 'Educacional',
    identificacao_unity: 'reino-animal'
  },
  {
    titulo: 'Alfabeto Divertido',
    descricao: 'Aprenda as letras do alfabeto com imagens e atividades interativas.',
    descricaoCompleta: 'O "Alfabeto Divertido" é um jogo educacional que ensina o alfabeto de forma dinâmica. Com ilustrações visuais, pronúncia clara e atividades de reconhecimento, favorece o aprendizado inicial da leitura e escrita.',
    icone: '🔤',
    background: '#FFF9C4',
    tags: ['Língua Portuguesa', 'Linguagens'],
    genero: 'Educacional',
    identificacao_unity: 'alfabeto-divertido'
  },
  {
    titulo: 'Formas Geométricas',
    descricao: 'Descubra as formas geométricas básicas através de quebra-cabeças e desafios acessórios.',
    descricaoCompleta: 'As "Formas Geométricas" apresentam conceitos de geometria básica através de jogos interativos. Os usuários aprendem a identificar, nomear e trabalhar com diferentes formas de maneira inclusiva e divertida.',
    icone: '✨',
    background: '#F3E5F5',
    tags: ['Matemática'],
    genero: 'Educacional',
    identificacao_unity: 'formas-geometricas'
  },
  {
    titulo: 'Minhas Emoções',
    descricao: 'Aprenda a identificar e expressar emoções de forma clara e divertida.',
    descricaoCompleta: 'O aplicativo "Minhas Emoções" foi desenvolvido para auxiliar crianças na compreensão e expressão de sentimentos. Com recursos visuais e atividades inclusivas, promove inteligência emocional e autorregulação.',
    icone: '😊',
    background: '#FCE4EC',
    tags: ['Ciências Humanas'],
    genero: 'Educacional',
    identificacao_unity: 'minhas-emocoes'
  }
];

async function inserirJogos() {
  try {
    console.log('🔄 Conectando ao MongoDB...');
    await mongoose.connect(URL_MONGODB);
    console.log('✓ Conectado!\n');

    const db = mongoose.connection.db;
    const colecao = db.collection('jogos');

    // Verificar se os jogos já existem
    const existentes = await colecao.countDocuments({ genero: 'Educacional' });
    
    if (existentes > 0) {
      console.log(`⚠️  Já existem ${existentes} jogos educacionais no banco!`);
      console.log('Deseja substituir? (S/N)');
      // Para simplicidade, vamos apenas informar
      console.log('💡 Para limpar, você pode deletar manualmente no MongoDB Atlas\n');
    }

    console.log('📝 Inserindo jogos educacionais...');
    const resultado = await colecao.insertMany(jogosEducacionais);
    
    console.log(`✓ ${resultado.insertedCount} jogos inseridos com sucesso!`);
    console.log('\nIDs dos jogos inseridos:');
    Object.entries(resultado.insertedIds).forEach(([index, id]) => {
      console.log(`  ${jogosEducacionais[index].titulo}: ${id}`);
    });

    process.exit(0);
  } catch (erro) {
    console.error('✗ Erro:', erro.message);
    process.exit(1);
  }
}

inserirJogos();
