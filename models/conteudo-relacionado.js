const mongoose = require('mongoose');

const conteudoRelacionadoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  link_externo: {
    type: String
  },
  pdf_url: {
    type: String
  },
  pdf: {
    type: Buffer
  },
  pdf_mime: {
    type: String
  },
  pdf_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  tipo: {
    type: String
  },
  data_postagem: {
    type: Date
  },
  jogos: [{
    type: mongoose.Schema.Types.Mixed
  }],
  createdBy: {
    type: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date
  }
}, {
  collection: 'conteudorelacionados'
});

module.exports = mongoose.model('ConteudoRelacionado', conteudoRelacionadoSchema);
