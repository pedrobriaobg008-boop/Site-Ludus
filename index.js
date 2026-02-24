const express = require('express');
const path = require('path');
const jogos = require('./models/jogos');

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

app.get('/jogos', (req, res) => {
  res.render('jogos', { jogos });
});

app.get('/jogo/:id', (req, res) => {
  const jogoId = parseInt(req.params.id);
  const jogo = jogos.find(j => j.id === jogoId);
  
  if (!jogo) {
    return res.status(404).render('404');
  }

  // Obter jogos relacionados
  const jogosRelacionados = jogo.relacionados
    .map(id => jogos.find(j => j.id === id))
    .filter(j => j !== undefined);

  res.render('jogo-detalhes', { jogo, jogosRelacionados });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
