// Boilerplate

import { FacilityRequirement } from '@app/entities/FacilityRequirement';
import { Facility } from '@app/entities/Facility';
import { Document } from '@app/entities/Document';
import { FacilityRequirement as PrismaFacilityRequirement } from '@prisma/client';

export class PrismaFacilityRequirementsMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(
    facilityRequirement: FacilityRequirement,
  ): PrismaFacilityRequirement {
    return {
      id: facilityRequirement.id,
      facility_id: facilityRequirement.facilityId,
      document_id: facilityRequirement.documentId,
    };
  }

  public static toDomain(
    facilityRequirement: PrismaFacilityRequirement,
    facility: Facility,
    document: Document,
  ): FacilityRequirement {
    return new FacilityRequirement(facilityRequirement.id, {
      facilityId: facilityRequirement.facility_id,
      documentId: facilityRequirement.document_id,
      facility,
      document,
    });
  }
}
