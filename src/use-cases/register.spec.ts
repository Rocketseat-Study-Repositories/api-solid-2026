import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register.js';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(_) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

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
});
