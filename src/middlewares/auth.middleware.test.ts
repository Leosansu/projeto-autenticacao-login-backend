import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authenticateToken } from './auth.middleware';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

describe('authenticateToken', () => {
  let req: Partial<Request> = { headers: {} };
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    // Garantir que headers nunca seja indefinido
    if (!req.headers) {
      req.headers = {};
    }
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    next = vi.fn();
  });

  it('deve retornar 401 se o token não for fornecido', () => {
    authenticateToken(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
    // Garantir que headers nunca seja indefinido
    if (!req.headers) req.headers = {};
    if (!req.headers) req.headers = {};
    req.headers['authorization'] = 'Bearer token_invalido';
  });

  it('deve retornar 403 se o token for inválido', () => {
    if (!req.headers) req.headers = {};
    req.headers['authorization'] = 'Bearer token_invalido';
    vi.spyOn(jwt, 'verify').mockImplementation((_token, _secret, callback) => {
      callback(new Error('invalid token'), null);
    });

    authenticateToken(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('deve adicionar user ao req e chamar next se o token for válido', () => {
    if (!req.headers) req.headers = {};
    req.headers['authorization'] = 'Bearer token_valido';
    const fakeUser = { id: 1, name: 'Test' };
    vi.spyOn(jwt, 'verify').mockImplementation((_token, _secret, callback) => {
      callback(null, fakeUser);
    });

    authenticateToken(req as Request, res as Response, next);
    expect((req as any).user).toEqual(fakeUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.status).not.toHaveBeenCalledWith(403);
  });
});