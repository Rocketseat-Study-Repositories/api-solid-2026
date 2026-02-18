import { UsersRepository } from '@/repositories/users-repository.js';
import { User } from '../../generated/prisma/client.js';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const findUserById = await this.usersRepository.findById(userId);

    if (!findUserById) {
      throw new ResourceNotFoundError();
    }

    return { user: findUserById };
  }
}
