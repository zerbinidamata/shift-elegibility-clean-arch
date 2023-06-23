import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Shift } from '@app/entities/Shift';
import { Worker } from '@app/entities/Worker';
import { PrismaShiftMapper } from '../mappers/prisma-shift-mapper';
import { EligibleShiftException } from '@app/exceptions/EligibleShiftsException';
@Injectable()
export class PrismaShiftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getEligibleShifts(
    worker: Worker,
    startDate: Date,
    endDate: Date,
  ): Promise<Shift[]> {
    const eligibleShifts = await this.prismaService.shift.findMany({
      where: {
        facility: {
          is_active: true,
          requirements: {
            every: {
              document: {
                workers: {
                  some: {
                    worker_id: worker.id,
                  },
                },
              },
            },
          },
        },
        is_deleted: false,
        worker: null,
        profession: worker.profession,
        start: {
          gte: startDate,
        },
        end: {
          lte: endDate,
        },
      },
      include: {
        facility: true,
      },
      distinct: ['id'],
    });

    if (!eligibleShifts || eligibleShifts.length === 0) {
      // Throw an error or return a specific result indicating no eligible shifts found
      throw EligibleShiftException.notFound();
    }

    return eligibleShifts.map((shift) => PrismaShiftMapper.toDomain(shift));
  }
}
