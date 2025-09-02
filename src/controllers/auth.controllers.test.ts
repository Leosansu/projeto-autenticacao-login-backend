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
});