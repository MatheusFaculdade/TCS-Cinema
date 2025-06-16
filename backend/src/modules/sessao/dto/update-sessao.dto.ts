import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessaoDto {
  @ApiProperty({ example: 'uuid-da-sessao', description: 'ID da sessão a ser atualizada' })
  id: string;

  @ApiProperty({ example: 'uuid-do-filme', description: 'ID do filme' })
  filmeId: string;

  @ApiProperty({ example: 'uuid-da-sala', description: 'ID da sala' })
  salaId: string;

  @ApiProperty({ example: '2025-06-15T20:30:00Z', description: 'Data e hora da sessão em formato ISO 8601' })
  dataHora: string;

  @ApiProperty({ example: 29.9, description: 'Preço do ingresso da sessão' })
  preco: number;

  @ApiProperty({ example: 'Português', description: 'Idioma da sessão (ex: Português, Inglês)' })
  idioma: string;

  @ApiProperty({ example: '3D', description: 'Formato da sessão (ex: 2D, 3D, IMAX)' })
  formato: string;
}
