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
  resolucao_largura: { type: Number, default: 1280, min: 240, max: 7680, validate: Number.isInteger },
  resolucao_altura: { type: Number, default: 800, min: 240, max: 7680, validate: Number.isInteger },
  link_jogar: {
    type: String
  },
  video_demo_url: {
    type: String
  },
  github_url: {
    type: String
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
  ativo: {
    type: Boolean,
    default: true
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
