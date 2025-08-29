import { Router } from 'express';
import { login, register, listUsers } from '../controllers/auth.controllers.js';
const router = Router();
router.post('/login', login);
router.post('/register', register);
router.get('/users', listUsers);
export default router;
//# sourceMappingURL=auth.routes.js.map