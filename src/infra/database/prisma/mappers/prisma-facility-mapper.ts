// Boilerplate code for PrismaFacilityMapper

import { Facility } from '@app/entities/Facility';
import { Shift } from '@app/entities/Shift';
import { FacilityRequirement } from '@app/entities/FacilityRequirement';
import { Facility as PrismaFacility } from '@prisma/client';

export class PrismaFacilityMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(facility: Facility): PrismaFacility {
    return {
      id: facility.id,
      name: facility.name,
      is_active: facility.isActive,
    };
  }

  public static toDomain(
    facility: PrismaFacility,
    shifts: Shift[],
    requirements: FacilityRequirement[],
  ): Facility {
    return new Facility(facility.id, {
      name: facility.name,
      isActive: facility.is_active,
      shifts,
      requirements,
    });
  }
}
