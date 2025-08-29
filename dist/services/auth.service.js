import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function registerUser(name, email, password) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        return null;
    return prisma.user.create({ data: { name, email, password } });
}
export async function getAllUsers() {
    //Esse trecho deve ser removido e foi posto só para critério de testes manuais
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, password: true } // inclui a senha
    });
}
export async function authenticateUser(email, password) {
    return prisma.user.findFirst({ where: { email, password } });
}
//# sourceMappingURL=auth.service.js.map