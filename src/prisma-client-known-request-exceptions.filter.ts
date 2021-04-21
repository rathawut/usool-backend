import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const FOREIGN_KEY_CONSTRAINT_FAILED_CODE = 'P2003';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestExceptionsFilter
  implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === FOREIGN_KEY_CONSTRAINT_FAILED_CODE) {
      const status = 400;
      const meta: { field_name?: string } = exception.meta;

      response.status(status).json({
        statusCode: status,
        message: [`Foreign key constraint failed [${meta.field_name}].`],
        error: 'Bad Request',
      });
    } else {
      const status = 500;

      response.status(status).json({
        statusCode: status,
        message: 'Internal server error',
      });
    }
  }
}
