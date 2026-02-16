import { UserRepository } from '@/repositories/users-repository.js';
import { hash } from 'bcryptjs';

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 5);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    this.usersRepository.create({ name, email, password_hash });
  }
}
