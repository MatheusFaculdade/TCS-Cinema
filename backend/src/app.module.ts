import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilmeModule } from './modules/filme/filme.module';
import { IngressoModule } from './modules/ingresso/ingresso.module';
import { SessaoModule } from './modules/sessao/sessao.module';
import { SalaModule } from './modules/sala/sala.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [FilmeModule, IngressoModule, SessaoModule, SalaModule, PrismaModule],
  providers: [AppService],
})
export class AppModule {}
