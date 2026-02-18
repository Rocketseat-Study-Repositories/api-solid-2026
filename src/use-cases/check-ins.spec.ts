import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js';
import { CheckInUseCase } from './check-in.js';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check Ins Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(usersRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-test',
      userId: 'user-test',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
