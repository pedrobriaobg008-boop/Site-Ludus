const mongoose = require('mongoose');

const equipeFotoSchema = new mongoose.Schema({
  mimeType: { type: String, required: true },
  dados: { type: Buffer, required: true }
}, { timestamps: true });

module.exports = mongoose.models.EquipeFoto || mongoose.model('EquipeFoto', equipeFotoSchema);
