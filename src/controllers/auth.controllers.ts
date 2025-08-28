import type { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/auth.service.js';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const user = authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  // Nunca retorne a senha!
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};

export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  const user = registerUser(name, email, password);

  if (!user) {
    return res.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  // Nunca retorne a senha!
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
};