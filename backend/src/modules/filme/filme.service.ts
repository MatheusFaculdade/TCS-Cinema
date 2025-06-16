import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.filme.findMany();
  }

  async findOne(id: string) {
    return this.prisma.filme.findUnique({ where: { id } });
  }

  async create(dto: CreateFilmeDto) {
    return this.prisma.filme.create({ data: dto });
  }

  async update(id: string, dto: UpdateFilmeDto) {
    return this.prisma.filme.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.filme.delete({ where: { id } });
  }
}
