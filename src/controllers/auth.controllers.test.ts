import { describe, it, expect, vi } from 'vitest';
import { login } from './auth.controllers';
import * as authService from '../services/auth.service';

describe('login controller', () => {
  it('deve retornar 400 se email ou senha não forem fornecidos', async () => {
    const req: any = { body: {} };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'E-mail e senha são obrigatórios.' });
  });

  it('deve retornar 401 se usuário ou senha forem inválidos', async () => {
    const req: any = { body: { email: 'teste@exemplo.com', password: 'senhaerrada' } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    vi.spyOn(authService, 'authenticateUser').mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário ou senha inválidos' });
  });

  it('deve retornar token e nome do usuário se login for bem-sucedido', async () => {
    const req: any = { body: { email: 'teste@exemplo.com', password: 'senha123' } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const fakeUser = { id: 1, name: 'Usuário Teste', email: 'teste@exemplo.com' };
    vi.spyOn(authService, 'authenticateUser').mockResolvedValue(fakeUser);

    // Mock do jwt.sign para retornar um token fixo
    vi.spyOn(require('jsonwebtoken'), 'sign').mockReturnValue('fake-token');

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: 'fake-token', nome: fakeUser.name });
  });
});