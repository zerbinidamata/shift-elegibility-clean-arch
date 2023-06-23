// Boilerplate

import { Document } from '@app/entities/Document';
import { DocumentWorker } from '@app/entities/DocumentWorker';
import { FacilityRequirement } from '@app/entities/FacilityRequirement';
import { Document as PrismaDocument } from '@prisma/client';

export class PrismaDocumentMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(document: Document): PrismaDocument {
    return {
      id: document.id,
      name: document.name,
      is_active: document.isActive,
    };
  }

  public static toDomain(
    document: PrismaDocument,
    requirements: FacilityRequirement[],
    workers: DocumentWorker[],
  ): Document {
    return new Document(document.id, {
      name: document.name,
      isActive: document.is_active,
      requirements,
      workers,
    });
  }
}
