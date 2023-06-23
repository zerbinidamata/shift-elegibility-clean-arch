import { FacilityRequirement } from './FacilityRequirement';
import { Shift } from './Shift';

export interface FacilityProps {
  name: string;
  isActive: boolean;
  requirements?: FacilityRequirement[];
  shifts?: Shift[];
}

export class Facility {
  public id: number;
  public name: string;
  public isActive: boolean;
  public requirements?: FacilityRequirement[];
  public shifts?: Shift[];

  constructor(id: number, props: FacilityProps) {
    this.id = id;
    this.name = props.name;
    this.isActive = props.isActive;
    this.requirements = props.requirements;
    this.shifts = props.shifts;
  }
}
