import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { personSchema } from 'src/person/person.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Person', schema: personSchema }])],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule { }
