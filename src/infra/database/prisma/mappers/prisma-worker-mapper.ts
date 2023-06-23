// Boilerplate

import { Worker } from '@app/entities/Worker';
import { DocumentWorker } from '@app/entities/DocumentWorker';
import { Profession } from '@app/entities/Profession';
import { Worker as PrismaWorker } from '@prisma/client';
import { Shift } from '@app/entities/Shift';
import { PrismaProfessionMapper } from './prisma-profession-mapper';

export class PrismaWorkerMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(worker: Worker): PrismaWorker {
    return {
      id: worker.id,
      name: worker.name,
      profession: PrismaProfessionMapper.toPrisma(worker.profession),
      is_active: worker.isActive,
    };
  }

  public static toDomain(
    worker: PrismaWorker,
    shifts?: Shift[],
    documents?: DocumentWorker[],
  ): Worker {
    const profession: Profession = PrismaProfessionMapper.toDomain(
      worker.profession,
    );

    return new Worker(worker.id, {
      name: worker.name,
      profession: profession,
      isActive: worker.is_active,
      shifts,
      documents,
    });
  }
}
