import { Prisma, CheckIn } from '../../generated/prisma/browser.js';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
