import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';
import { GetUserProfileUseCase } from './get-user-profile.js';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository.js';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(createdUser.name);
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'non-exist-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
