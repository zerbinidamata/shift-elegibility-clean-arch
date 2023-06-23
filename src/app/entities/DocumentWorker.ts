import { Worker } from './Worker';
import { Document } from './Document';

export interface DocumentWorkerProps {
  workerId: number;
  documentId: number;
  worker: Worker;
  document: Document;
}

export class DocumentWorker {
  public id: number;
  public workerId: number;
  public documentId: number;
  public worker?: Worker;
  public document?: Document;

  constructor(id: number, props: DocumentWorkerProps) {
    this.id = id;
    this.workerId = props.workerId;
    this.documentId = props.documentId;
    this.worker = props.worker;
  }
}
