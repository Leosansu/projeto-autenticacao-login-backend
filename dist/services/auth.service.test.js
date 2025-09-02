import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as authService from './auth.service.js';
const mockUser = { id: 1, name: 'Test', email: 'test@example.com', password: 'pass123' };
const users = []; // Defina fora do vi.mock
vi.mock('@prisma/client', () => {
    return {
        PrismaClient: vi.fn().mockImplementation(() => ({
            user: {
                findUnique: vi.fn(({ where }) => users.find(u => u.email === where.email) || null),
                create: vi.fn(({ data }) => {
                    const newUser = { ...data, id: users.length + 1 };
                    users.push(newUser);
                    return newUser;
                }),
                findMany: vi.fn(() => [...users]),
                findFirst: vi.fn(({ where }) => users.find(u => u.email === where.email && u.password === where.password) || null),
            },
        })),
    };
});
describe('auth.service', () => {
    beforeEach(() => {
        users.length = 0; // Limpa o array de usuários antes de cada teste
    });
    describe('registerUser', () => {
        it('should register a new user if email does not exist', async () => {
            const user = await authService.registerUser('Test', 'test@example.com', 'pass123');
            expect(user).toMatchObject({ name: 'Test', email: 'test@example.com', password: 'pass123' });
        });
        it('should return null if email already exists', async () => {
            await authService.registerUser('Test', 'test@example.com', 'pass123');
            const user = await authService.registerUser('Test', 'test@example.com', 'pass123');
            expect(user).toBeNull();
        });
    });
    describe('getAllUsers', () => {
        it('should return all users', async () => {
            await authService.registerUser('Test', 'test@example.com', 'pass123');
            const users = await authService.getAllUsers();
            expect(users.length).toBe(1);
            expect(users[0]).toMatchObject({ name: 'Test', email: 'test@example.com', password: 'pass123' });
        });
    });
    describe('authenticateUser', () => {
        it('should authenticate user with correct credentials', async () => {
            await authService.registerUser('Test', 'test@example.com', 'pass123');
            const user = await authService.authenticateUser('test@example.com', 'pass123');
            expect(user).toMatchObject({ name: 'Test', email: 'test@example.com', password: 'pass123' });
        });
        it('should return null for incorrect credentials', async () => {
            await authService.registerUser('Test', 'test@example.com', 'pass123');
            const user = await authService.authenticateUser('test@example.com', 'wrongpass');
            expect(user).toBeNull();
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map