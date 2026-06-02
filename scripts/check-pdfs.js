require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
if (!url) {
  console.error('MONGODB_URI não encontrada em .env');
  process.exit(2);
}

const ConteudoRelacionadoSchema = new mongoose.Schema({}, { strict: false, collection: 'conteudorelacionados' });
const ConteudoRelacionado = mongoose.model('ConteudoRelacionado', ConteudoRelacionadoSchema);

(async () => {
  try {
    await mongoose.connect(url, { dbName: 'ludus' });
    console.log('Conectado ao MongoDB');

    const docs = await ConteudoRelacionado.find({ tipo: 'Artigo' }).limit(200).lean();
    if (!docs || docs.length === 0) {
      console.log('Nenhum documento de tipo Artigo encontrado.');
      process.exit(0);
    }

    console.log(`Encontrados ${docs.length} artigos (mostrando até 200):\n`);
    docs.forEach((d) => {
      const hasPdfUrl = Boolean(d.pdf_url);
      const hasPdfId = Boolean(d.pdf_id);
      console.log(`- _id: ${d._id} | titulo: ${String(d.titulo || '').slice(0,60)} | pdf_url: ${hasPdfUrl} | pdf_id: ${hasPdfId}`);
    });

    // Show sample pdf_url values (first 5 with pdf_url)
    const withUrl = docs.filter(d => d.pdf_url).slice(0,5);
    if (withUrl.length > 0) {
      console.log('\nAmostra de pdf_url (até 5):');
      withUrl.forEach(d => console.log(`${d._id} -> ${d.pdf_url}`));
    }

    // Show sample pdf_id values (first 5)
    const withId = docs.filter(d => d.pdf_id || d.pdf_id === 0).slice(0,5);
    if (withId.length > 0) {
      console.log('\nAmostra de pdf_id (até 5):');
      withId.forEach(d => console.log(`${d._id} -> ${d.pdf_id}`));
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Erro ao consultar MongoDB:', err.message || err);
    process.exit(1);
  }
})();
