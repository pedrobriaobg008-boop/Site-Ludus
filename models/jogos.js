const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  identificacao_unity: {
    type: String,
    required: true
  },
  link_jogar: {
    type: String
  },
  video_demo_url: {
    type: String
  },
  github_url: {
    type: String
  },
  icone_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  icone_url: {
    type: String
  },
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }],
  total_niveis: {
    type: Number
  },
  xp_maxima: {
    type: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Jogo', jogoSchema);
