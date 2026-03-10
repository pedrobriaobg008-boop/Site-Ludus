const app = require('../app');
const conectarMongoDB = require('../config/conexao');

module.exports = async (req, res) => {
	try {
		await conectarMongoDB();
		return app(req, res);
	} catch (erro) {
		console.error('Erro ao inicializar handler serverless:', erro);
		return res.status(500).json({
			erro: 'Falha interna ao conectar ao banco de dados.'
		});
	}
};
