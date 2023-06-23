import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShiftsController } from './controllers/shifts.controller';
import { GetEligibleShiftsUseCase } from '@app/use-cases/get-eligible-shifts';

@Module({
  imports: [DatabaseModule],
  controllers: [ShiftsController],
  providers: [GetEligibleShiftsUseCase],
})
export class HttpModule {}
