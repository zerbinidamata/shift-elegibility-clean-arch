import { Facility } from './Facility';
import { Document } from './Document';

export interface FacilityRequirementProps {
  facilityId: number;
  documentId: number;
  facility: Facility;
  document: Document;
}

export class FacilityRequirement {
  public id?: number;
  public facilityId: number;
  public documentId: number;
  public facility?: Facility;
  public document?: Document;

  constructor(id: number, props: FacilityRequirementProps) {
    this.id = id;
    this.facilityId = props.facilityId;
    this.documentId = props.documentId;
    this.facility = props.facility;
    this.document = props.document;
  }
}
