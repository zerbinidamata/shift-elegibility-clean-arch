import { Injectable, UseInterceptors } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Worker } from '@app/entities/Worker';
import { PrismaWorkerMapper } from '../mappers/prisma-worker-mapper';
import { WorkerExecption } from '@app/exceptions/WorkerExecption';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class PrismaWorkerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60) // miliseconds
  async findById(id: number): Promise<Worker> {
    const worker = await this.prismaService.worker.findUnique({
      where: {
        id,
      },
    });

    if (!worker) {
      throw WorkerExecption.notFound();
    }

    return PrismaWorkerMapper.toDomain(worker);
  }
}
