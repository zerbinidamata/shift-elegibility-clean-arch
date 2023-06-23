import { HttpException, HttpStatus } from '@nestjs/common';

export class WorkerExecption extends HttpException {
  details?: Record<string, unknown>;

  private constructor(
    message: string,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;

    HttpException.captureStackTrace(this, WorkerExecption);
  }

  public static notFound(details?: Record<string, unknown>): WorkerExecption {
    return new WorkerExecption(
      'Worker not found',
      HttpStatus.NOT_FOUND,
      details,
    );
  }

  public static notActive(details?: Record<string, unknown>): WorkerExecption {
    return new WorkerExecption(
      'Worker is not active',
      HttpStatus.NOT_FOUND,
      details,
    );
  }
}
