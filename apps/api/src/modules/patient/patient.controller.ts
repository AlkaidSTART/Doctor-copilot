import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll() {
    return this.patientService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }
}
