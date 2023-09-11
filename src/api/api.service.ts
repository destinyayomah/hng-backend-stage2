import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatchExceptionHandler, CustomHttpException } from 'src/lib';
import { PersonDto } from 'src/person/dto';
import { CreatePersonDto } from './dto';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class ApiService {
    constructor(
        @InjectModel('Person') private readonly personModel: Model<PersonDto>
    ) { }

    async create(dto: CreatePersonDto): Promise<Number> {
        try {
            if (!dto.name) {
                throw new HttpException('name is required', HttpStatus.BAD_REQUEST);
            }

            const personExists = await this.personModel
                .findOne({ name: dto.name })
                .exec();

            if (personExists) {
                throw new HttpException('Person already exists', HttpStatus.BAD_REQUEST);
            }

            const existingDocumentsCount = await this.personModel.countDocuments({});
            const nextIndex = existingDocumentsCount + 1;

            const newPerson = new this.personModel({
                id: nextIndex,
                name: dto.name
            });

            const person = await newPerson.save();

            return person.id;
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }

    async get(id: number): Promise<PersonDto> {
        try {
            if (isNaN(id)) {
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'invalid id',
                    'BAD_REQUEST',
                );
            }

            const person = await this.personModel.findOne({ id }, 'id name -_id').exec();

            if (!person) {
                CustomHttpException(
                    HttpStatus.NOT_FOUND,
                    'Person Not Found',
                    'NOT_FOUND',
                );
            }

            return person;
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }

    async update(id: number, dto: CreatePersonDto): Promise<PersonDto> {
        try {
            if (isNaN(id)) {
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'invalid id',
                    'BAD_REQUEST',
                );
            }

            const person = await this.personModel.findOne({ id }, 'id name -_id').exec();

            if (!person) {
                CustomHttpException(
                    HttpStatus.NOT_FOUND,
                    'Person Not Found',
                    'NOT_FOUND',
                );
            }

            if (!dto.name && typeof dto.name !== 'string') {
                CustomHttpException(
                    HttpStatus.NOT_FOUND,
                    'Name is not valid',
                    'UNPROCESSABLE_ENTITY',
                );
            }

            const personExists = await this.personModel.findOne({ name: dto.name }).exec();

            if (personExists) {
                CustomHttpException(
                    HttpStatus.CONFLICT,
                    'Person already exits',
                    'CONFLICT',
                );
            }

            const personData = await this.personModel.findOneAndUpdate({ id }, { $set: dto }, { new: true })
                .select('id name -_id')
                .exec();

            return personData;
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }

    async delete(id: number) {
        try {
            if (isNaN(id)) {
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'invalid id',
                    'BAD_REQUEST',
                );
            }

            const person = await this.personModel.findOne({ id }, 'id name -_id').exec();

            if (!person) {
                CustomHttpException(
                    HttpStatus.NOT_FOUND,
                    'Person Not Found',
                    'NOT_FOUND',
                );
            }

            await this.personModel.deleteOne({ id }).exec();
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }
}