import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ingresso.findMany({
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.ingresso.findUnique({ where: { id } });
  }

  create(data: CreateIngressoDto) {
    return this.prisma.ingresso.create({ data });
  }

  update(id: string, data: UpdateIngressoDto) {
    return this.prisma.ingresso.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.ingresso.delete({ where: { id } });
  }
}
