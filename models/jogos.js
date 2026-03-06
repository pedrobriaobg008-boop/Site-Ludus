const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
  nome: {
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
  icone_url: {
    type: String
  },
  icon: {
    type: String
  },
  background: {
    type: String
  },
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }],
  tags: [String],
  total_niveis: {
    type: Number
  },
  xp_maxima: {
    type: Number
  },
  relacionados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogo'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Getter virtual para compatibilidade com views (retorna _id como id)
jogoSchema.virtual('id').get(function() {
  return this._id;
});

module.exports = mongoose.model('Jogo', jogoSchema);
