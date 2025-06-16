import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 1', description: 'Nome da sala' })
  nome: string;

  @ApiProperty({ example: 120, description: 'Capacidade total de assentos' })
  capacidade: number;

  @ApiProperty({ example: 'IMAX', description: 'Tipo da sala (ex: IMAX, 3D, comum)' })
  tipo: string;
}
