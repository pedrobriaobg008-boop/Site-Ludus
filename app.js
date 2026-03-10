const express = require('express');
const path = require('path');
const Jogo = require('./models/jogos');
const Categoria = require('./models/categoria');
const equipe = require('./models/equipe');
const parceiros = require('./models/parceiros');

const app = express();

const normalizarCategoria = (texto = '') => String(texto)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const selecionarAleatorios = (itens = [], limite = 4) => {
  const copia = [...itens];

  for (let indice = copia.length - 1; indice > 0; indice -= 1) {
    const indiceAleatorio = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[indiceAleatorio]] = [copia[indiceAleatorio], copia[indice]];
  }

  return copia.slice(0, limite);
};

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.get('/', async (req, res) => {
  try {
    const jogos = await Jogo.find().populate('categorias').lean();
    const jogosDestaque = selecionarAleatorios(jogos, 4);

    res.render('index', { jogosDestaque });
  } catch (erro) {
    console.error('Erro ao buscar jogos em destaque:', erro);
    res.render('index', { jogosDestaque: [] });
  }
});

app.get('/projeto', (req, res) => {
  res.render('projeto');
});

app.get('/jogos', async (req, res) => {
  try {
    const [jogos, categoriasDoBanco] = await Promise.all([
      Jogo.find().populate('categorias'),
      Categoria.find({}, { nome: 1 }).sort({ nome: 1 }).lean()
    ]);

    const categoriasExtras = new Set();

    jogos.forEach((jogo) => {
      if (!Array.isArray(jogo.categorias)) {
        return;
      }

      jogo.categorias.forEach((categoria) => {
        if (categoria && typeof categoria === 'object' && categoria.nome) {
          categoriasExtras.add(categoria.nome);
          return;
        }

        if (typeof categoria === 'string' && !/^[a-f0-9]{24}$/i.test(categoria)) {
          categoriasExtras.add(categoria);
        }
      });
    });

    const nomesCategorias = [
      ...new Set([
        ...categoriasDoBanco.map((categoria) => categoria.nome).filter(Boolean),
        ...categoriasExtras
      ])
    ].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

    const categorias = nomesCategorias
      .map((nome) => ({
        nome,
        slug: normalizarCategoria(nome)
      }))
      .filter((categoria) => categoria.slug);

    res.render('jogos', { jogos, categorias });
  } catch (erro) {
    console.error('Erro ao buscar jogos:', erro);
    res.render('jogos', { jogos: [], categorias: [] });
  }
});

app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find({}, { nome: 1, descricao: 1 })
      .sort({ nome: 1 })
      .lean();

    res.json(categorias);
  } catch (erro) {
    console.error('Erro ao buscar categorias:', erro);
    res.status(500).json({ erro: 'Falha ao buscar categorias' });
  }
});

app.get('/equipe', (req, res) => {
  res.render('equipe', { equipe });
});

app.get('/parceiros', (req, res) => {
  res.render('parceiros', { parceiros });
});

app.get('/jogo/:id', async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id).populate('categorias');

    if (!jogo) {
      return res.status(404).send('Jogo nao encontrado');
    }

    const jogosRelacionados = await Jogo.find({
      _id: { $ne: jogo._id }
    }).limit(3).populate('categorias');

    res.render('jogo-detalhes', {
      jogo,
      jogosRelacionados
    });
  } catch (erro) {
    console.error('Erro ao buscar jogo:', erro);
    res.status(404).send('Jogo nao encontrado');
  }
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

module.exports = app;