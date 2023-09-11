import { Body, Controller, HttpCode, HttpStatus, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreatePersonDto } from './dto';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPerson(@Body() dto: CreatePersonDto): Promise<Object> {
        const id = await this.apiService.create(dto);
        return { statusCode: HttpStatus.CREATED, id, message: 'Person Created' };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getAPerson(@Param('id') id: number) {
        return await this.apiService.get(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updatePerson(@Param('id') id: number, @Body() dto: CreatePersonDto): Promise<Object> {
        const response = await this.apiService.update(id, dto);
        return {statusCode: HttpStatus.OK, message: 'Person Updated', data: response};
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deletePerson(@Param('id') id: number) {
        await this.apiService.delete(id);
        return { statusCode: HttpStatus.OK, message: 'Person Deleted' };
    }
}