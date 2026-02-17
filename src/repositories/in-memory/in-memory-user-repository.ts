import { User } from '../../../generated/prisma/browser.js';
import { UserCreateInput } from '../../../generated/prisma/models.js';
import { UsersRepository } from '../users-repository.js';

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: UserCreateInput): Promise<User> {
    const user = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
