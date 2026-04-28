const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  resumo: {
    type: String
  },
  conteudo: {
    type: String
  },
  jogos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogo'
  }],
  slug: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artigo', artigoSchema);
