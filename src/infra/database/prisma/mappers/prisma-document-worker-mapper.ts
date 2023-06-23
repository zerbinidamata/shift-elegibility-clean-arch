// Boilerplate

import { DocumentWorker } from '@app/entities/DocumentWorker';
import { Worker } from '@app/entities/Worker';
import { Document } from '@app/entities/Document';
import { DocumentWorker as PrismaDocumentWorker } from '@prisma/client';

export class PrismaDocumentWorkerMapper {
  private constructor() {
    throw new Error('This class cannot be instantiated');
  }

  public static toPrisma(documentWorker: DocumentWorker): PrismaDocumentWorker {
    return {
      id: documentWorker.id,
      document_id: documentWorker.documentId,
      worker_id: documentWorker.workerId,
    };
  }

  public static toDomain(
    documentWorker: PrismaDocumentWorker,
    worker: Worker,
    document: Document,
  ): DocumentWorker {
    return new DocumentWorker(documentWorker.id, {
      documentId: documentWorker.document_id,
      workerId: documentWorker.worker_id,
      document,
      worker,
    });
  }
}
