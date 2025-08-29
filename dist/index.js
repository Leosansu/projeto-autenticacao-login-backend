// Ponto de entrada da aplicação
import express from 'express';
import authRoutes from './routes/auth.routes.js'; // note o .js no final para ES Modules
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map