import { PrismaShiftRepository } from './prisma-shift-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Shift } from '@app/entities/Shift';
import { Worker } from '@app/entities/Worker';

describe('PrismaShiftRepository', () => {
  let prismaShiftRepository: PrismaShiftRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    prismaShiftRepository = new PrismaShiftRepository(prismaService);
  });

  describe('getEligibleShifts', () => {
    it('should return eligible shifts for a worker within the specified date range', async () => {
      // Create a mock worker and dates for the test
      const worker: Worker = {
        id: 1,
        name: 'John Doe',
        profession: 'CNA' as any,
        isActive: true,
      };
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-07');

      // Mock the PrismaService's shift.findMany method to return sample data
      prismaService.shift.findMany = jest.fn().mockResolvedValue([
        {
          id: 1,
          start: new Date('2023-01-02'),
          end: new Date('2023-01-03'),
          profession: 'CNA',
          isDeleted: false,
          facility: {
            id: 1,
            name: 'Facility 1',
            isActive: true,
            requirements: [],
          },
        },
        {
          id: 2,
          start: new Date('2023-01-05'),
          end: new Date('2023-01-06'),
          profession: 'CNA',
          isDeleted: false,
          facility: {
            id: 2,
            name: 'Facility 2',
            isActive: true,
            requirements: [],
          },
        },
      ]);

      // Call the getEligibleShifts method
      const eligibleShifts: Shift[] =
        await prismaShiftRepository.getEligibleShifts(
          worker,
          startDate,
          endDate,
        );

      // Assert the returned eligible shifts
      expect(eligibleShifts).toHaveLength(2);
      expect(eligibleShifts[0].id).toBe(1);
      expect(eligibleShifts[0].facility.id).toBe(1);
      expect(eligibleShifts[1].id).toBe(2);
      expect(eligibleShifts[1].facility.id).toBe(2);
    });
  });
});
