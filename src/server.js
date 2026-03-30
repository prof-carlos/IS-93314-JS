require('dotenv').config(); // Carrega o .env antes de tudo

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro:', error);
    }
}

startServer();