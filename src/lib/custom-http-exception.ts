import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorResponse } from "src/types";

export const CustomHttpException = (status: HttpStatus, message: string, error: string) => {
    const errorObject: ErrorResponse = { statusCode: status, message, error };
    throw new HttpException(errorObject, status);
}