import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { ShiftRepository } from '@app/repositories/ShiftRepository';
import { PrismaShiftRepository } from './prisma/repositories/prisma-shift-repository';
import { WorkerRepository } from '@app/repositories/WorkerRepository';
import { PrismaWorkerRepository } from './prisma/repositories/prisma-worker-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ShiftRepository,
      useClass: PrismaShiftRepository,
    },
    {
      provide: WorkerRepository,
      useClass: PrismaWorkerRepository,
    },
  ],
  exports: [
    {
      provide: ShiftRepository,
      useClass: PrismaShiftRepository,
    },
    {
      provide: WorkerRepository,
      useClass: PrismaWorkerRepository,
    },
  ],
})
export class DatabaseModule {}
