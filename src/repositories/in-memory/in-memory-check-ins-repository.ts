import { randomUUID } from 'node:crypto';
import { CheckInUncheckedCreateInput } from '../../../generated/prisma/models.js';
import { CheckInsRepository } from '../check-ins-repository.js';
import { CheckIn } from '../../../generated/prisma/client.js';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
