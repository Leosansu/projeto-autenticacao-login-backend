import type { User } from '../models/user.model.js';

let users: User[] = [];
let nextId = 1;

export function registerUser(name: string, email: string, password: string): User | null {
  // Verifica se já existe usuário com o mesmo e-mail
  const exists = users.some(user => user.email === email);
  if (exists) {
    return null; // Usuário já existe
  }

  const newUser: User = {
    id: nextId++,
    name,
    email,
    password, // Em produção, nunca salve senha em texto puro!
  };

  users.push(newUser);
  return newUser;
}