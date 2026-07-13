import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.patient.findMany({
      include: { doctor: true },
    });
  }

  async create(createPatientDto: CreatePatientDto) {
    const { doctorId, ...data } = createPatientDto;
    return this.prisma.patient.create({
      data: {
        ...data,
        doctorId,
      },
      include: { doctor: true },
    });
  }
}
