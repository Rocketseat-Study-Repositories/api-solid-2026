import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credential-erros.js';
import { makeAuhenticateUseCase } from '@/use-cases/factory/make-authenticate-use-case.js';
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
    const authenticateUseCase = makeAuhenticateUseCase();
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
