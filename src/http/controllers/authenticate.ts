import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { AuthenticateUseCase } from '@/use-cases/authenticate.js';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credential-erros.js';
import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticationBody = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBody.parse(request.body);

  try {
    const authenticateUseCase = new AuthenticateUseCase(
      new PrismaUsersRepository()
    );
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
