import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register.js';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUserRepository());

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUserRepository());

    const PASSWORD_TEST = '123456';

    const { user } = await registerUseCase.execute({
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
    const registerUseCase = new RegisterUseCase(new InMemoryUserRepository());

    const USER_TEST = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await registerUseCase.execute(USER_TEST);

    expect(() => registerUseCase.execute(USER_TEST)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
