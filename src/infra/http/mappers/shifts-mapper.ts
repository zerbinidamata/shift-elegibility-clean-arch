import { Shift } from '@app/entities/Shift';
import { ShiftDto } from '../dtos/shift.dto';

export class ShiftMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toDto(shift: Shift): ShiftDto {
    return {
      id: shift.id,
      profession: shift.profession,
      start: shift.start,
      end: shift.end,
      workerId: shift.workerId,
      isDeleted: shift.isDeleted,
      facilityId: shift.facilityId,
    };
  }
}
