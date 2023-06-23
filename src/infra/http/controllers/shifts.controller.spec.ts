import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShiftsController } from './shifts.controller';
import { GetEligibleShiftsUseCase } from '@app/use-cases/get-eligible-shifts';

describe('ShiftsController', () => {
  let controller: ShiftsController;
  let getEligibleShiftsMock: jest.Mock;

  beforeEach(async () => {
    getEligibleShiftsMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftsController],
      providers: [
        {
          provide: GetEligibleShiftsUseCase,
          useValue: { execute: getEligibleShiftsMock },
        },
      ],
    }).compile();

    controller = module.get<ShiftsController>(ShiftsController);
  });

  describe('getAllAvailableShiftsForWorker', () => {
    it('should throw BadRequestException for invalid date format', async () => {
      const workerId = 1;
      const startDate = 'invalid-date';
      const endDate = '2023-06-01';

      const promise = controller.getAllAvailableShiftsForWorker(
        workerId,
        startDate,
        endDate,
      );

      await expect(promise).rejects.toThrow(BadRequestException);
      expect(getEligibleShiftsMock).not.toBeCalled();
    });

    it('should call getEligibleShifts and return the result', async () => {
      const workerId = 1;
      const startDate = '2023-06-01';
      const endDate = '2023-06-02';

      const eligibleShiftsResult = [
        [
          {
            startDate: '2023-03-02',
            shifts: [
              {
                _id: 56050,
                props: {
                  start: '2023-03-02T13:00:00.722Z',
                  end: '2023-03-02T18:00:00.722Z',
                  profession: 'CNA',
                  isDeleted: false,
                  facilityId: 4,
                  workerId: null,
                },
              },
              {
                _id: 123340,
                props: {
                  start: '2023-03-02T13:00:00.689Z',
                  end: '2023-03-02T18:00:00.689Z',
                  profession: 'CNA',
                  isDeleted: false,
                  facilityId: 8,
                  workerId: null,
                },
              },
            ],
          },
        ],
      ];
      getEligibleShiftsMock.mockResolvedValue(eligibleShiftsResult);

      const result = await controller.getAllAvailableShiftsForWorker(
        workerId,
        startDate,
        endDate,
      );

      expect(result).toEqual(eligibleShiftsResult);
      expect(getEligibleShiftsMock).toBeCalledWith({
        workerId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    });
  });
});
