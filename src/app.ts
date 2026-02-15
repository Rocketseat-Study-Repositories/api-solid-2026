import fastify from 'fastify';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export const app = fastify();

const adapter = new PrismaPg({ connectionString: 'YEPCOCK' });
const prisma = new PrismaClient({ adapter });
