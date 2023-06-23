import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetEligibleShiftsUseCase } from '@app/use-cases/get-eligible-shifts';
import { Shift } from '@app/entities/Shift';
import { GetEligibleShiftsDto } from '../dtos/get-eligible-shifts.dto';

@Controller('shifts')
@ApiTags('shifts')
export class ShiftsController {
  constructor(private readonly getEligibleShifts: GetEligibleShiftsUseCase) {}

  @Get('health')
  @ApiResponse({
    status: 200,
    description: 'Health check.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async health() {
    return { status: 'OK' };
  }

  @Get(':workerId')
  @ApiResponse({
    status: 200,
    description: 'Worker eligible shifts',
    type: Shift,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Worker not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllAvailableShiftsForWorker(
    @Param('workerId', ParseIntPipe) workerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<GetEligibleShiftsDto[]> {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);

    if (isNaN(startDateParsed.getTime()) || isNaN(endDateParsed.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const eligibleShifts: GetEligibleShiftsDto[] =
      await this.getEligibleShifts.execute({
        workerId,
        startDate: startDateParsed,
        endDate: endDateParsed,
      });

    return eligibleShifts;
  }
}
