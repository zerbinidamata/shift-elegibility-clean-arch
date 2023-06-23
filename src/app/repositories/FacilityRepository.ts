// Boilerplate code for FacilityRepository
// just the method signatures to show how it should look like in a real project

import { Facility } from '@app/entities/Facility';

export abstract class FacilityRepository {
  abstract create(facility: Facility): Promise<Facility>;
  abstract update(facility: Facility): Promise<Facility>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Facility>;
  abstract findAll(): Promise<Facility[]>;
  abstract getActiveFacilities(): Promise<Facility[]>;
}
