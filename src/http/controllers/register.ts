import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { RegisterService } from '@/services/register.js';
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
    const registerService = new RegisterService(new PrismaUsersRepository());
    await registerService.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
