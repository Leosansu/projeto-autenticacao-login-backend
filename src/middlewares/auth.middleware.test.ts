import { authenticateToken } from './auth.middleware.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('deve retornar 401 se o token não for fornecido', () => {
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 403 se o token for inválido', () => {
    req.headers['authorization'] = 'Bearer token_invalido';
    (jwt.verify as jest.Mock).mockImplementation((_token, _secret, callback) => {
      callback(new Error('Token inválido'), null);
    });

    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next e adicionar user ao req se o token for válido', () => {
    req.headers['authorization'] = 'Bearer token_valido';
    const fakeUser = { userId: 1, email: 'teste@email.com' };
    (jwt.verify as jest.Mock).mockImplementation((_token, _secret, callback) => {
      callback(null, fakeUser);
    });

    authenticateToken(req, res, next);
    expect((req as any).user).toEqual(fakeUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.status).not.toHaveBeenCalledWith(403);
  });
});