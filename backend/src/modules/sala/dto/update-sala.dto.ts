import { ApiProperty } from '@nestjs/swagger';

export class UpdateSalaDto {
  @ApiProperty({ example: 'd4f9cabc-1234-5678-9012-abcdefabcdef', description: 'ID da sala' })
  id: string;

  @ApiProperty({ example: 'Sala 1', description: 'Nome da sala' })
  nome: string;

  @ApiProperty({ example: 120, description: 'Capacidade total de assentos' })
  capacidade: number;

  @ApiProperty({ example: 'IMAX', description: 'Tipo da sala (ex: IMAX, 3D, comum)' })
  tipo: string;
}
