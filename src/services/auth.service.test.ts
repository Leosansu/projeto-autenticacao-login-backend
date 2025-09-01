// Declare os mocks primeiro
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();

// Só depois faça o mock do PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: mockFindUnique,
        create: mockCreate,
      },
    })),
  };
});

// Agora importe o registerUser
import { registerUser } from './auth.service';

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