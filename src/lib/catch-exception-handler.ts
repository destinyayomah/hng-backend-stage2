import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { ErrorResponse } from "src/types";

export const CatchExceptionHandler = (error: any) => {
    if (error instanceof HttpException) throw new HttpException(error.getResponse(), error.getStatus());

    if (error.name === 'MongoServerError' && error.code === 11000) throw new HttpException({ statusCode: HttpStatus.CONFLICT, message: 'Email alreay in use', error: 'Duplicate Error' } as ErrorResponse, HttpStatus.BAD_REQUEST);

    if (error.name === 'MongoServerError') throw new HttpException({ statusCode: HttpStatus.CONFLICT, message: error.message, error: error.name } as ErrorResponse, HttpStatus.BAD_REQUEST);
    
    throw new InternalServerErrorException('Unhandled Exception');
}