import { UsersRepository } from '@/repositories/users-repository.js';
import { InvalidCredentialsError } from './errors/invalid-credential-erros.js';
import { compare } from 'bcryptjs';
import { User } from '../../generated/prisma/client.js';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
