import { Test } from '@nestjs/testing';
import { PrismaWorkerRepository } from './prisma-worker-repository';
import { PrismaService } from '../prisma.service';
import { Worker } from '@app/entities/Worker';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaWorkerMapper } from '../mappers/prisma-worker-mapper';
import { WorkerExecption } from '@app/exceptions/WorkerExecption';

describe('PrismaWorkerRepository', () => {
  let prismaWorkerRepository: PrismaWorkerRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CacheModule.register(), // Add the CacheModule import
      ],
      providers: [
        PrismaWorkerRepository,
        {
          provide: PrismaService,
          useValue: {
            worker: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    prismaWorkerRepository = moduleRef.get<PrismaWorkerRepository>(
      PrismaWorkerRepository,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('findById', () => {
    it('should return a worker when found', async () => {
      const workerId = 1;
      const mockWorker: Worker = {
        id: workerId,
        name: 'John Doe',
        profession: 'CNA' as any,
        isActive: true,
      };

      jest
        .spyOn(prismaService.worker, 'findUnique')
        .mockResolvedValueOnce(PrismaWorkerMapper.toPrisma(mockWorker));

      const result = await prismaWorkerRepository.findById(workerId);

      expect(prismaService.worker.findUnique).toHaveBeenCalledWith({
        where: { id: workerId },
      });
      expect(result).toEqual(mockWorker);
    });

    it('should throw NotFoundException when worker is not found', async () => {
      const workerId = 1;

      jest
        .spyOn(prismaService.worker, 'findUnique')
        .mockResolvedValueOnce(null);

      await expect(
        prismaWorkerRepository.findById(workerId),
      ).rejects.toThrowError(WorkerExecption.notFound());
      expect(prismaService.worker.findUnique).toHaveBeenCalledWith({
        where: { id: workerId },
      });
    });
  });
});
