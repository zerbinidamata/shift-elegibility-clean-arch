import { FacilityRequirement } from './FacilityRequirement';
import { DocumentWorker } from './DocumentWorker';

export interface DocumentProps {
  name: string;
  isActive: boolean;
  requirements: FacilityRequirement[];
  workers: DocumentWorker[];
}

export class Document {
  public id: number;
  public name: string;
  public isActive: boolean;
  public requirements?: FacilityRequirement[];
  public workers?: DocumentWorker[];

  constructor(id: number, props: DocumentProps) {
    this.id = id;
    this.name = props.name;
    this.isActive = props.isActive;
    this.requirements = props.requirements;
    this.workers = props.workers;
  }
}
