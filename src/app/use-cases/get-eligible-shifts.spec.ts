import { Test, TestingModule } from '@nestjs/testing';
import { GetEligibleShiftsUseCase, GroupedByDate } from './get-eligible-shifts';
import { ShiftRepository } from '@app/repositories/ShiftRepository';
import { WorkerRepository } from '@app/repositories/WorkerRepository';
import { WorkerExecption } from '@app/exceptions/WorkerExecption';
import { Worker } from '@app/entities/Worker';
import { Shift } from '@app/entities/Shift';
import { Profession } from '@prisma/client';

describe('GetEligibleShiftsUseCase', () => {
  let useCase: GetEligibleShiftsUseCase;
  let shiftRepository: ShiftRepository;
  let workerRepository: WorkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEligibleShiftsUseCase,
        {
          provide: ShiftRepository,
          useValue: {
            getEligibleShifts: jest.fn(),
          },
        },
        {
          provide: WorkerRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetEligibleShiftsUseCase>(GetEligibleShiftsUseCase);
    shiftRepository = module.get<ShiftRepository>(ShiftRepository);
    workerRepository = module.get<WorkerRepository>(WorkerRepository);
  });

  describe('execute', () => {
    it('should throw WorkerExecption if worker is not active', async () => {
      const request = {
        workerId: 1,
        startDate: new Date(),
        endDate: new Date(),
      };
      const worker = new Worker(1, {
        isActive: false,
        name: 'Sample Worker',
        profession: Profession.CNA as any,
      });

      jest.spyOn(workerRepository, 'findById').mockResolvedValueOnce(worker);

      await expect(useCase.execute(request)).rejects.toThrow(
        WorkerExecption.notActive(),
      );
    });

    it('should return eligible shifts if worker is active', async () => {
      const request = {
        workerId: 1,
        startDate: new Date(),
        endDate: new Date(),
      };

      const worker = new Worker(1, {
        isActive: true,
        name: 'Sample Worker',
        profession: Profession.CNA as any,
      });
      jest.spyOn(workerRepository, 'findById').mockResolvedValueOnce(worker);

      const eligibleShifts = [
        {
          id: 56050,
          start: new Date('2023-03-02T13:00:00.722Z'),
          end: new Date('2023-03-02T18:00:00.722Z'),
          profession: Profession.CNA as any,
          isDeleted: false,
          facilityId: 4,
          workerId: null,
        },
      ];
      jest
        .spyOn(shiftRepository, 'getEligibleShifts')
        .mockResolvedValueOnce(eligibleShifts);

      const expectedShifts = [
        {
          startDate: '2023-03-02',
          shifts: [
            {
              id: 56050,
              start: new Date('2023-03-02T13:00:00.722Z'),
              end: new Date('2023-03-02T18:00:00.722Z'),
              profession: 'CNA',
              isDeleted: false,
              facilityId: 4,
              workerId: null,
            },
          ],
        },
      ];

      const result = await useCase.execute(request);

      expect(result).toEqual(expectedShifts);
    });

    it('should return eligible shifts that meet the requirements', async () => {
      // Arrange
      const request = {
        workerId: 1,
        startDate: new Date(),
        endDate: new Date(),
      };

      const activeWorker = new Worker(1, {
        name: 'John',
        isActive: true,
        profession: 'CNA' as any,
        documents: [
          { id: 1, workerId: 1, documentId: 1 },
          { id: 2, workerId: 1, documentId: 2 },
        ],
      });

      const mockShifts: Shift[] = [
        new Shift(1, {
          start: new Date(),
          end: new Date(),
          profession: 'CNA' as any,
          facilityId: 1,
          isDeleted: false,
          facility: {
            id: 1,
            isActive: true,
            name: 'Facility 1',
            requirements: [
              {
                facilityId: 1,
                documentId: 1,
              },
              {
                facilityId: 1,
                documentId: 2,
              },
            ],
          },
        }),
        new Shift(2, {
          start: new Date(),
          end: new Date(),
          profession: 'CNA' as any,
          facilityId: 2,
          isDeleted: false,
          facility: {
            id: 2,
            isActive: true,
            name: 'Facility 2',
            requirements: [
              {
                facilityId: 2,
                documentId: 3,
              },
            ],
          },
        }),
      ];

      jest
        .spyOn(workerRepository, 'findById')
        .mockResolvedValueOnce(activeWorker);

      jest
        .spyOn(shiftRepository, 'getEligibleShifts')
        .mockResolvedValueOnce([mockShifts[0]]);

      // Act
      const result = await useCase.execute(request);

      // Assert
      expect(result).toHaveLength(1); // Assuming all shifts have the same start date
      const groupedShifts: GroupedByDate = result[0];
      expect(groupedShifts.startDate).toBe(
        request.startDate.toISOString().split('T')[0],
      );
      expect(groupedShifts.shifts).toHaveLength(1); // Only one shift should meet the requirements
      expect(workerRepository.findById).toHaveBeenCalledWith(request.workerId);
    });
  });
});
