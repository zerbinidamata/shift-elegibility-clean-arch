// Boilerplate

import { Profession as PrismaProfession } from '@prisma/client';
import { Profession } from '@app/entities/Profession';

export class PrismaProfessionMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toDomain(profession: PrismaProfession): Profession {
    return profession as Profession;
  }

  public static toPrisma(profession: Profession): PrismaProfession {
    return profession as PrismaProfession;
  }
}
