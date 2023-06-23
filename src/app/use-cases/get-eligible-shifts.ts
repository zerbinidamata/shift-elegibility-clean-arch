import { Injectable } from '@nestjs/common';
import { Shift } from '@app/entities/Shift';
import { ShiftRepository } from '@app/repositories/ShiftRepository';
import { WorkerRepository } from '@app/repositories/WorkerRepository';
import { UseCase } from './use-case';
import { WorkerExecption } from '@app/exceptions/WorkerExecption';

interface GetEligibleShiftsRequest {
  workerId: number;
  startDate: Date;
  endDate: Date;
}

export interface GroupedByDate {
  startDate: string;
  shifts: Shift[];
}

@Injectable()
export class GetEligibleShiftsUseCase
  implements UseCase<GetEligibleShiftsRequest, GroupedByDate[]>
{
  constructor(
    private readonly shiftRepository: ShiftRepository,
    private readonly workerRepository: WorkerRepository,
  ) {}

  async execute(request: GetEligibleShiftsRequest): Promise<GroupedByDate[]> {
    const { workerId, startDate, endDate } = request;

    const worker = await this.workerRepository.findById(workerId);

    if (!worker.isActive) {
      throw WorkerExecption.notActive();
    }

    const eligibleShifts: Shift[] =
      await this.shiftRepository.getEligibleShifts(worker, startDate, endDate);

    const groupedShifts: { [startDate: string]: Shift[] } =
      eligibleShifts.reduce((groups, shift) => {
        const startDate = shift.start.toISOString().split('T')[0]; // Extract the date part
        if (!groups[startDate]) {
          groups[startDate] = [];
        }
        groups[startDate].push(shift);
        return groups;
      }, {});

    // Convert the grouped shifts object into an array
    const result: GroupedByDate[] = Object.entries(groupedShifts).map(
      ([startDate, shifts]) => ({
        startDate,
        shifts,
      }),
    );

    return result;
  }
}
