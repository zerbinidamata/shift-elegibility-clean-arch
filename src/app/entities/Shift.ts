import { Profession } from './Profession';
import { Facility } from './Facility';
import { Worker } from './Worker';
export interface ShiftProps {
  start: Date;
  end: Date;
  profession: Profession;
  isDeleted: boolean;
  facilityId: number;
  workerId?: number;
  facility?: Facility;
  worker?: Worker;
}

export class Shift {
  public id: number;
  public start: Date;
  public end: Date;
  public profession: Profession;
  public isDeleted: boolean;
  public facilityId: number;
  public workerId?: number;
  public facility?: Facility;
  public worker?: Worker;

  constructor(id: number, props: ShiftProps) {
    this.id = id;
    this.start = props.start;
    this.end = props.end;
    this.profession = props.profession;
    this.isDeleted = props.isDeleted;
    this.facilityId = props.facilityId;
    this.workerId = props.workerId;
    this.facility = props.facility;
    this.worker = props.worker;
  }
}
