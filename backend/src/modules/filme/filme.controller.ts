import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Controller('filmes')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Get()
  findAll() {
    return this.filmeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFilmeDto) {
    return this.filmeService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilmeDto) {
    return this.filmeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmeService.remove(id);
  }
}
