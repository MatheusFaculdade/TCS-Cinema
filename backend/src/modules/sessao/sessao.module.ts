import { Module } from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { SessaoController } from './sessao.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SessaoService],
  controllers: [SessaoController],
  imports: [PrismaModule],
})
export class SessaoModule {}
