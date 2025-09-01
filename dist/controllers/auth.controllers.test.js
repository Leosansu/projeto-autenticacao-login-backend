import { login, register, listUsers } from './auth.controllers.js';
import * as authService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
jest.mock('../services/auth.service');
jest.mock('jsonwebtoken');
describe('auth.controllers', () => {
    let req;
    let res;
    beforeEach(() => {
        req = { body: {}, headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe('login', () => {
        it('deve retornar 400 se email ou senha não forem fornecidos', async () => {
            req.body = {};
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'E-mail e senha são obrigatórios.' });
        });
        it('deve retornar 401 se autenticação falhar', async () => {
            req.body = { email: 'a@email.com', password: '123' };
            authService.authenticateUser.mockResolvedValue(null);
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuário ou senha inválidos' });
        });
        it('deve retornar token e nome se autenticação for bem-sucedida', async () => {
            req.body = { email: 'a@email.com', password: '123' };
            const fakeUser = { id: 1, email: 'a@email.com', name: 'João' };
            authService.authenticateUser.mockResolvedValue(fakeUser);
            jwt.sign.mockReturnValue('fakeToken');
            await login(req, res);
            expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken', nome: 'João' });
        });
    });
    describe('register', () => {
        it('deve retornar 400 se dados obrigatórios estiverem faltando', async () => {
            req.body = {};
            await register(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Nome, e-mail e senha são obrigatórios.' });
        });
        it('deve retornar 400 se senha for menor que 8 caracteres', async () => {
            req.body = { name: 'João', email: 'a@email.com', password: '123' };
            await register(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'A senha deve ter no mínimo 8 caracteres.' });
        });
        it('deve retornar 409 se email já estiver cadastrado', async () => {
            req.body = { name: 'João', email: 'a@email.com', password: '12345678' };
            authService.registerUser.mockResolvedValue(null);
            await register(req, res);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: 'E-mail já cadastrado.' });
        });
        it('deve retornar usuário criado sem senha', async () => {
            req.body = { name: 'João', email: 'a@email.com', password: '12345678' };
            const fakeUser = { id: 1, name: 'João', email: 'a@email.com', password: '12345678' };
            authService.registerUser.mockResolvedValue(fakeUser);
            await register(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'João', email: 'a@email.com' });
        });
    });
    describe('listUsers', () => {
        it('deve retornar lista de usuários', async () => {
            const users = [{ id: 1, name: 'João', email: 'a@email.com' }];
            authService.getAllUsers.mockResolvedValue(users);
            await listUsers(req, res);
            expect(res.json).toHaveBeenCalledWith(users);
        });
    });
});
//# sourceMappingURL=auth.controllers.test.js.map