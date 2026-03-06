const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  descricaoCompleta: {
    type: String
  },
  identificacao_unity: {
    type: String
  },
  link_jogar: {
    type: String
  },
  icone: {
    type: String
  },
  background: {
    type: String
  },
  tags: [String],
  genero: {
    type: String,
    default: 'Educacional'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Jogo', jogoSchema);
