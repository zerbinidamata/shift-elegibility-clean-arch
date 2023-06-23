import { HttpException, HttpStatus } from '@nestjs/common';

export class EligibleShiftException extends HttpException {
  details?: Record<string, unknown>;

  private constructor(
    message: string,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;

    HttpException.captureStackTrace(this, EligibleShiftException);
  }

  public static notFound(
    details?: Record<string, unknown>,
  ): EligibleShiftException {
    return new EligibleShiftException(
      'Eligible shifts not found',
      HttpStatus.NOT_FOUND,
      details,
    );
  }
}
