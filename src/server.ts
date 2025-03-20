import express from 'express';
import cors from 'cors';
import { sequelize } from './database';
import productRoutes from './routes/productRoutes';
import { specs, swaggerUi } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', productRoutes);

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    });
});
