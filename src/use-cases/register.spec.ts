import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register.js';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const PASSWORD_TEST = '123456';

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: PASSWORD_TEST,
    });

    const isPasswordCorrectlyHashed = await compare(
      PASSWORD_TEST,
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register two users with same email', async () => {
    const USER_TEST = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await sut.execute(USER_TEST);

    await expect(() => sut.execute(USER_TEST)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
