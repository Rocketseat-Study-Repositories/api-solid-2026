import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().nonempty(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('🐔 Invalid Envioroment variables', _env.error.format());
  throw new Error('Invalid enviroment variables');
}

export const env = _env.data;
