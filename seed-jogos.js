const mongoose = require('mongoose');
require('dotenv').config();

const Jogo = require('./models/jogos');
const Categoria = require('./models/categoria');

const URL_MONGODB = process.env.MONGODB_URI || 'mongodb+srv://Aluno:123@cluster0.9ekdn5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Dados dos jogos educacionais alinhados ao schema atual
const jogosEducacionais = [
  {
    nome: 'Mundo das Cores',
    descricao: 'Aprenda sobre cores de forma divertida e interativa. Ideal para desenvolver habilidades visuais e cognitivas.',
    categorias: ['Arte', 'Linguagens'],
    identificacao_unity: 'mundo-das-cores'
  },
  {
    nome: 'Aventura dos Números',
    descricao: 'Explore o mundo dos números com atividades lúdicas e acessíveis para todas as crianças.',
    categorias: ['Matemática'],
    identificacao_unity: 'aventura-numeros'
  },
  {
    nome: 'Reino Animal',
    descricao: 'Conheça os animais e seus habitats através de jogos educacionais e ilustrações amigáveis.',
    categorias: ['Ciências da Natureza'],
    identificacao_unity: 'reino-animal'
  },
  {
    nome: 'Alfabeto Divertido',
    descricao: 'Aprenda as letras do alfabeto com imagens e atividades interativas.',
    categorias: ['Língua Portuguesa', 'Linguagens'],
    identificacao_unity: 'alfabeto-divertido'
  },
  {
    nome: 'Formas Geométricas',
    descricao: 'Descubra as formas geométricas básicas através de quebra-cabeças e desafios acessíveis.',
    categorias: ['Matemática'],
    identificacao_unity: 'formas-geometricas'
  },
  {
    nome: 'Minhas Emoções',
    descricao: 'Aprenda a identificar e expressar emoções de forma clara e divertida.',
    categorias: ['Ciências Humanas'],
    identificacao_unity: 'minhas-emocoes'
  }
];

async function obterOuCriarCategorias(nomes) {
  const nomesUnicos = [...new Set(nomes.filter(Boolean))];

  if (nomesUnicos.length === 0) {
    return new Map();
  }

  const existentes = await Categoria.find({ nome: { $in: nomesUnicos } }).lean();
  const mapaCategorias = new Map(existentes.map((categoria) => [categoria.nome, categoria._id]));

  const faltantes = nomesUnicos.filter((nome) => !mapaCategorias.has(nome));
  if (faltantes.length > 0) {
    const criadas = await Categoria.insertMany(faltantes.map((nome) => ({ nome })));
    criadas.forEach((categoria) => {
      mapaCategorias.set(categoria.nome, categoria._id);
    });
  }

  return mapaCategorias;
}

function montarJogosParaInsercao(mapaCategorias) {
  return jogosEducacionais.map((jogo) => ({
    nome: jogo.nome,
    descricao: jogo.descricao,
    identificacao_unity: jogo.identificacao_unity,
    categorias: (jogo.categorias || [])
      .map((nomeCategoria) => mapaCategorias.get(nomeCategoria))
      .filter(Boolean)
  }));
}

async function inserirJogos() {
  try {
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(URL_MONGODB, { dbName: 'ludus' });
    console.log('Conectado!');

    const nomesCategorias = jogosEducacionais.flatMap((jogo) => jogo.categorias || []);
    const mapaCategorias = await obterOuCriarCategorias(nomesCategorias);
    const jogosParaInserir = montarJogosParaInsercao(mapaCategorias);

    const resultado = await Jogo.insertMany(jogosParaInserir);

    console.log(`${resultado.length} jogos inseridos com sucesso.`);
    console.log('IDs dos jogos inseridos:');
    resultado.forEach((jogo) => {
      console.log(`- ${jogo.nome}: ${jogo._id}`);
    });
  } catch (erro) {
    console.error('Erro ao inserir jogos:', erro.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

inserirJogos();
