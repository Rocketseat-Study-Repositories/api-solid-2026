import { UsersRepository } from '@/repositories/users-repository.js';
import { InvalidCredentialsError } from './errors/invalid-credential-erros.js';
import { compare } from 'bcryptjs';
import { CheckIn, User } from '../../generated/prisma/client.js';
import { CheckInsRepository } from '@/repositories/check-ins-repository.js';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUserCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUserCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
