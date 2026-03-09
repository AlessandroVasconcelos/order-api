const app = require('./app');
const sequelize = require('./config/database');
require('./models');

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
}

startServer();
