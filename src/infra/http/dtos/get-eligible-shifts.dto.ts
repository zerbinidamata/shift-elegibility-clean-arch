import { ApiProperty } from '@nestjs/swagger';
import { ShiftDto } from './shift.dto';

export class GetEligibleShiftsDto {
  @ApiProperty({ isArray: true, type: ShiftDto })
  startDate: string;
  shifts: ShiftDto[];
}
