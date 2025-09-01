import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return null;
  }
  const newUser = await prisma.user.create({
    data: { name, email, password },
  });
  return newUser;
}

export async function getAllUsers() {
  //Esse trecho deve ser removido e foi posto só para critério de testes manuais
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, password: true } // inclui a senha
  });
}

export async function authenticateUser(email: string, password: string) {
  return prisma.user.findFirst({ where: { email, password } });
}