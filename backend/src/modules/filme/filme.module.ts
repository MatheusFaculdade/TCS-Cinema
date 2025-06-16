import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  providers: [FilmeService],
  controllers: [FilmeController],
  imports: [PrismaModule],
})
export class FilmeModule {}
