// src/entities/Worker.ts

import { Shift } from './Shift';
import { DocumentWorker } from './DocumentWorker';
import { Profession } from './Profession';

export interface WorkerProps {
  name: string;
  isActive: boolean;
  profession: Profession;
  shifts?: Shift[];
  documents?: DocumentWorker[];
}

export class Worker {
  public id: number;
  public name: string;
  public isActive: boolean;
  public profession: Profession;
  public shifts?: Shift[];
  public documents?: DocumentWorker[];

  constructor(id: number, props: WorkerProps) {
    this.id = id;
    this.name = props.name;
    this.isActive = props.isActive;
    this.profession = props.profession;
    this.shifts = props.shifts;
    this.documents = props.documents;
  }
}
