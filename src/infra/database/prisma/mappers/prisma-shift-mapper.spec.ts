import { Shift } from '@app/entities/Shift';
import { Profession } from '@app/entities/Profession';
import {
  Shift as PrismaShift,
  Facility as PrismaFacility,
} from '@prisma/client';
import { PrismaShiftMapper } from './prisma-shift-mapper';

describe('PrismaShiftMapper', () => {
  describe('toPrisma', () => {
    it('should convert a Shift entity to PrismaShift', () => {
      // Arrange
      const shiftEntity: Shift = new Shift(1, {
        start: new Date(),
        end: new Date(),
        profession: Profession.CNA,
        isDeleted: false,
        facilityId: 1,
        workerId: 1,
      });

      const prismaShift: PrismaShift = PrismaShiftMapper.toPrisma(shiftEntity);

      expect(prismaShift).toBeDefined();
    });
  });

  describe('toDomain', () => {
    it('should convert a PrismaShift with facility to Shift entity', () => {
      const prismaShift: PrismaShift & { facility: PrismaFacility } = {
        id: 1,
        start: new Date(),
        end: new Date(),
        profession: 'CNA',
        is_deleted: false,
        facility_id: 1,
        worker_id: 1,
        facility: {
          id: 1,
          name: 'Facility Name',
          is_active: true,
        },
      };

      const shiftEntity: Shift = PrismaShiftMapper.toDomain(prismaShift);

      expect(shiftEntity).toBeDefined();
    });
  });
});
