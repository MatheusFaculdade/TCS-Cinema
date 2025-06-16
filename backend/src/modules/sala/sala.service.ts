import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.sala.findMany();
  }

  findOne(id: string) {
    return this.prisma.sala.findUnique({ where: { id } });
  }

  create(dto: CreateSalaDto) {
    return this.prisma.sala.create({ data: dto });
  }

  update(id: string, dto: UpdateSalaDto) {
    const { id: _, ...data } = dto;
    return this.prisma.sala.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.sala.delete({ where: { id } });
  }
}
