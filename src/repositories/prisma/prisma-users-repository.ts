import { prisma } from '@/lib/prisma.js';
import { UserCreateInput } from '../../../generated/prisma/models.js';
import { UserRepository } from '../users-repository.js';

export class PrismaUsersRepository implements UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
