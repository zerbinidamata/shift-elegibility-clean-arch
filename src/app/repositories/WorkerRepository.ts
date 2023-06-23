// Boilerplate code for WorkerRepository
// just the method signatures to show how it should look like in a real project
import { Worker } from '@app/entities/Worker';
import { Facility } from '@app/entities/Facility';
import { Shift } from '@app/entities/Shift';
export abstract class WorkerRepository {
  abstract create(worker: Worker): Promise<Worker>;
  abstract update(worker: Worker): Promise<Worker>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Worker>;
  abstract findAll(): Promise<Worker[]>;
  abstract getActiveWorkers(): Promise<Worker[]>;
  abstract hasRequiredDocuments(worker: Worker, facility: Facility): boolean;
  abstract hasMatchingProfession(worker: Worker, shift: Shift): boolean;
}
