import { Router } from 'express';
import { listUsers, login, register } from '../controllers/auth.controllers.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
const router = Router();
router.post('/register', register); // pública
router.post('/login', login); // pública
router.get('/users', authenticateToken, listUsers); // protegida
export default router;
//# sourceMappingURL=auth.routes.js.map