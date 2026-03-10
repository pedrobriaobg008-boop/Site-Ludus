const express = require('express');
const path = require('path');
const Jogo = require('./models/jogos');
require('./models/categoria');
const equipe = require('./models/equipe');
const parceiros = require('./models/parceiros');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/projeto', (req, res) => {
  res.render('projeto');
});

app.get('/jogos', async (req, res) => {
  try {
    const jogos = await Jogo.find().populate('categorias');
    res.render('jogos', { jogos });
  } catch (erro) {
    console.error('Erro ao buscar jogos:', erro);
    res.render('jogos', { jogos: [] });
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