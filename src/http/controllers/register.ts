import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js';
import { RegisterUseCase } from '@/use-cases/register.js';
import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrationBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registrationBody.parse(request.body);

  try {
    const registerUseCase = new RegisterUseCase(new PrismaUsersRepository());
    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send(); // TODO: Need to fix deez
  }

  return reply.status(201).send();
}
