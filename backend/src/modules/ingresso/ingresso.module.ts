import { Module } from '@nestjs/common';
import { IngressoService } from './ingresso.service';
import { IngressoController } from './ingresso.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [IngressoService],
  controllers: [IngressoController],
    imports: [PrismaModule],
})
export class IngressoModule {}
