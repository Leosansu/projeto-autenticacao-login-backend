import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, authenticateUser, getAllUsers } from '../services/auth.service.js';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const user = await authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  // Gere o token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'secreta123',
    { expiresIn: '1h' }
  );

  // Inclui o nome do usuário na resposta
  res.json({ token, nome: user.name });
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