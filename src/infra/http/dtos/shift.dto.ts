import { ApiProperty } from '@nestjs/swagger';
import { Profession } from '@app/entities/Profession';

export class ShiftDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  facilityId: number;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  profession: Profession;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty({ required: false })
  workerId?: number;
}
