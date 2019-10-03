import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import  Environments  from '../enviroment/config'
@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();

        let status = (error instanceof HttpException) ?
            HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;

        if (status === HttpStatus.BAD_REQUEST) {
            return response.status(status).send(error.message);
        }
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            if (process.env.NODE_ENV == Environments.Production.toString()) {
                return response.status(status).send('Internal Server Error!');
            }
            else {
                return response.status(status).send(error.message);
            }
        }
    }
}