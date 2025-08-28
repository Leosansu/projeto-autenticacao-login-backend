import { Router } from 'express';
// import { AuthController } from '../controllers/auth.controller'; // será criado depois
const router = Router();
// Exemplo de rotas (os métodos do controller serão implementados depois)
router.post('/login', (req, res) => {
    // Chamar AuthController.login(req, res) depois
    res.send('Login');
});
router.post('/register', (req, res) => {
    // Chamar AuthController.register(req, res) depois
    res.send('Register');
});
export default router;
//# sourceMappingURL=auth.routes.js.map