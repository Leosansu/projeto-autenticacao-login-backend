// Ponto de entrada da aplicação
import express from 'express';
import authRoutes from './routes/auth.routes.js'; // note o .js no final para ES Modules
import 'dotenv/config';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001']
}));
app.use(express.json());
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map