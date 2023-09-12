import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatchExceptionHandler, CustomHttpException, StringEmpty } from 'src/lib';
import { PersonDto } from 'src/person/dto';
import { CreatePersonDto } from './dto';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class ApiService {
    constructor(
        @InjectModel('Person') private readonly personModel: Model<PersonDto>
    ) { }

    async create(dto: CreatePersonDto): Promise<Object> {
        try {
            if (!dto.name) {
                throw new HttpException('name is required', HttpStatus.UNPROCESSABLE_ENTITY);
            }

            if(typeof dto.name !== 'string') throw new HttpException('name must be a string', HttpStatus.UNPROCESSABLE_ENTITY);

            const personExists = await this.personModel
                .findOne({ name: dto.name })
                .exec();

            if (personExists) {
                throw new HttpException('Person already exists', HttpStatus.CONFLICT);
            }

            const newPerson = new this.personModel({
                name: dto.name
            });

            const person = await newPerson.save();

            return person._id;
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }

    async get(_id: string): Promise<PersonDto> {
        try {
            if (StringEmpty(_id))
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'id should not be empty',
                    'BAD_REQUEST',
                );

            if (!_id.match(/^[0-9a-fA-F]{24}$/))
                CustomHttpException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    'invalid id',
                    'UNPROCESSABLE_ENTITY',
                );

            const person = await this.personModel.findOne({ _id }, '_id name').exec();

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

    async update(_id: string, dto: CreatePersonDto): Promise<PersonDto> {
        try {
            if (StringEmpty(_id))
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'id should not be empty',
                    'BAD_REQUEST',
                );

            if (!_id.match(/^[0-9a-fA-F]{24}$/))
                CustomHttpException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    'invalid id',
                    'UNPROCESSABLE_ENTITY',
                );

            const person = await this.personModel.findOne({ _id }, '_id name').exec();

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

            const personData = await this.personModel.findOneAndUpdate({ _id }, { $set: dto }, { new: true })
                .select('_id name')
                .exec();

            return personData;
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }

    async delete(_id: string) {
        try {
            if (StringEmpty(_id))
                CustomHttpException(
                    HttpStatus.BAD_REQUEST,
                    'id should not be empty',
                    'BAD_REQUEST',
                );

            if (!_id.match(/^[0-9a-fA-F]{24}$/))
                CustomHttpException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    'invalid id',
                    'UNPROCESSABLE_ENTITY',
                );

            const person = await this.personModel.findOne({ _id }, '_id name').exec();

            if (!person) {
                CustomHttpException(
                    HttpStatus.NOT_FOUND,
                    'Person Not Found',
                    'NOT_FOUND',
                );
            }

            await this.personModel.deleteOne({ _id }).exec();
        } catch (error) {
            CatchExceptionHandler(error);
        }
    }
}