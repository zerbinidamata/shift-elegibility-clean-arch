import { Shift } from '@app/entities/Shift';
import { Worker } from '@app/entities/Worker';

export abstract class ShiftRepository {
  abstract create(shift: Shift): Promise<Shift>;
  abstract update(shift: Shift): Promise<Shift>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Shift>;
  abstract findAll(): Promise<Shift[]>;
  abstract getEligibleShifts(
    worker: Worker,
    startDate: Date,
    endDate: Date,
  ): Promise<Shift[]>;
}
