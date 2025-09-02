import { login } from './auth.controllers.js';
import { authenticateUser } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
jest.mock('../services/auth.service.js');
jest.mock('jsonwebtoken');
const mockAuthenticateUser = authenticateUser;
const mockJwtSign = jwt.sign;
describe('login controller', () => {
    let req;
    let res;
    let statusMock;
    let jsonMock;
    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        req = { body: {} };
        res = { status: statusMock, json: jsonMock };
        jest.clearAllMocks();
    });
    it('should return 400 if email or password is missing', async () => {
        req.body = { email: '', password: '' };
        await login(req, res);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'E-mail e senha são obrigatórios.' });
    });
    it('should return 401 if user is not authenticated', async () => {
        req.body = { email: 'test@example.com', password: 'password123' };
        mockAuthenticateUser.mockResolvedValue(null);
        await login(req, res);
        expect(mockAuthenticateUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(statusMock).toHaveBeenCalledWith(401);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuário ou senha inválidos' });
    });
    it('should return token and user name if authentication is successful', async () => {
        req.body = { email: 'test@example.com', password: 'password123' };
        const user = { id: 1, email: 'test@example.com', name: 'Test User' };
        mockAuthenticateUser.mockResolvedValue(user);
        mockJwtSign.mockReturnValue('mocked.jwt.token');
        await login(req, res);
        expect(mockAuthenticateUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(mockJwtSign).toHaveBeenCalledWith({ userId: user.id, email: user.email }, expect.any(String), { expiresIn: '1h' });
        expect(jsonMock).toHaveBeenCalledWith({ token: 'mocked.jwt.token', nome: 'Test User' });
    });
});
//# sourceMappingURL=auth.controllers.test.js.map