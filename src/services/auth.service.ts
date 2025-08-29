import type { User } from '../models/user.model.js';

let users: User[] = [];
let nextId = 1;

export function registerUser(name: string, email: string, password: string): User | null {
  const exists = users.some(user => user.email === email);
  if (exists) return null;

  const newUser: User = { id: nextId++, name, email, password };
  users.push(newUser);
  return newUser;
}

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find(user => user.email === email && user.password === password);
  return user || null;
}

export function getAllUsers(): User[] {
  return users;
}