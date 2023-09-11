import { HttpStatus } from "@nestjs/common"

export type ErrorResponse = {
    statusCode: number,
    message: string,
    error: string
}