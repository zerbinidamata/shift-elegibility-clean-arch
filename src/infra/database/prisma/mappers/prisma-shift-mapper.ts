import { Shift } from '@app/entities/Shift';
import { Profession } from '@app/entities/Profession';
import { Facility } from '@app/entities/Facility';
import {
  Shift as PrismaShift,
  Facility as PrismaFacility,
} from '@prisma/client';
import { PrismaProfessionMapper } from './prisma-profession-mapper';

export class PrismaShiftMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(shift: Shift): PrismaShift {
    return {
      id: shift.id,
      start: shift.start,
      end: shift.end,
      profession: PrismaProfessionMapper.toPrisma(shift.profession),
      is_deleted: shift.isDeleted,
      facility_id: shift.facilityId,
      worker_id: shift.workerId,
    };
  }

  public static toDomain(
    shift: PrismaShift & { facility: PrismaFacility },
  ): Shift {
    const profession: Profession = PrismaProfessionMapper.toDomain(
      shift.profession,
    );

    const facility: Facility = {
      id: shift.facility.id,
      name: shift.facility.name,
      isActive: shift.facility.is_active,
    };

    return new Shift(shift.id, {
      start: shift.start,
      end: shift.end,
      profession: profession,
      isDeleted: shift.is_deleted,
      facilityId: shift.facility_id,
      workerId: shift.worker_id,
      facility: facility,
    });
  }
}
