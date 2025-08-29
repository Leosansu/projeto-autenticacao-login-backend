import type { Request, Response } from 'express';
import { registerUser, authenticateUser, getAllUsers } from '../services/auth.service.js';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const user = await authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  // Nunca retorne a senha!
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres.' });
  }

  const user = await registerUser(name, email, password);

  if (!user) {
    return res.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  // Nunca retorne a senha!
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
};

export const listUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};