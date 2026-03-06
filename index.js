const express = require('express');
const path = require('path');
const conectarMongoDB = require('./config/conexao');
const Jogo = require('./models/jogos');
const equipe = require('./models/equipe');
const parceiros = require('./models/parceiros');

const app = express();
const PORT = process.env.PORT || 3000;

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
    const jogos = await Jogo.find({ genero: 'Educacional' });
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
    const jogo = await Jogo.findById(req.params.id);
    
    if (!jogo) {
      return res.status(404).render('404');
    }

    // Buscar jogos relacionados do mesmo gênero
    const jogosRelacionados = await Jogo.find({ 
      genero: jogo.genero,
      _id: { $ne: jogo._id }
    }).limit(3);

    res.render('jogo-detalhes', { 
      jogo, 
      jogosRelacionados
    });
  } catch (erro) {
    console.error('Erro ao buscar jogo:', erro);
    res.status(404).render('404');
  }
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

// Iniciar servidor
const iniciarServidor = async () => {
  try {
    await conectarMongoDB();
    app.listen(PORT, () => {
      console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('✗ Erro ao iniciar servidor:', erro);
    process.exit(1);
  }
};

iniciarServidor();
