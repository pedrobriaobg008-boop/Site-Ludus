const app = require('./app');
const conectarMongoDB = require('./config/conexao');
const PORT = process.env.PORT || 3000;

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
