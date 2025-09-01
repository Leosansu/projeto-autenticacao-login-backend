// Declare os mocks primeiro
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();
const mockFindMany = jest.fn();

// Só depois faça o mock do PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: mockFindUnique,
        create: mockCreate,
        findMany: mockFindMany,
      },
    })),
  };
});

// Importe as funções a serem testadas
import { registerUser, getAllUsers } from './auth.service';

describe('registerUser', () => {
  beforeEach(() => {
    mockFindUnique.mockReset();
    mockCreate.mockReset();
  });

  it('deve retornar null se o usuário já existir', async () => {
    mockFindUnique.mockResolvedValue({ id: 1, email: 'teste@exemplo.com' });
    const result = await registerUser('nome', 'teste@exemplo.com', 'senha');
    expect(result).toBeNull();
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { email: 'teste@exemplo.com' } });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('deve criar usuário se ele não existir', async () => {
    mockFindUnique.mockResolvedValue(null);
    const fakeUser = { id: 2, name: 'nome', email: 'novo@exemplo.com', password: 'senha' };
    mockCreate.mockResolvedValue(fakeUser);
    const result = await registerUser('nome', 'novo@exemplo.com', 'senha');
    expect(mockCreate).toHaveBeenCalledWith({
      data: { name: 'nome', email: 'novo@exemplo.com', password: 'senha' },
    });
    expect(result).toEqual(fakeUser);
  });
});

describe('getAllUsers', () => {
  beforeEach(() => {
    mockFindMany.mockReset();
  });

  it('deve retornar lista de usuários', async () => {
    const users = [
      { id: 1, name: 'A', email: 'a@email.com', password: '123' },
      { id: 2, name: 'B', email: 'b@email.com', password: '456' },
    ];
    mockFindMany.mockResolvedValue(users);
    const result = await getAllUsers();
    expect(mockFindMany).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('deve retornar lista vazia se não houver usuários', async () => {
    mockFindMany.mockResolvedValue([]);
    const result = await getAllUsers();
    expect(result).toEqual([]);
  });
});