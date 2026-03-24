const app = require('./app');
const sequelize = require('./src/config/db');
require('dotenv').config();

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