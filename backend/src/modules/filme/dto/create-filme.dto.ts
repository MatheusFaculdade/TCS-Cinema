import { IsString, IsInt, IsDateString, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmeDto {
  @ApiProperty({
    description: 'Título do filme',
    example: 'Matrix',
  })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: 'Descrição do filme',
    example: 'Um hacker descobre a verdade sobre sua realidade.',
  })
  @IsString()
  @Length(1, 1000)
  description: string;

  @ApiProperty({
    description: 'Gênero do filme como código numérico',
    example: 1,
  })
  @IsInt()
  @Min(0)
  gender: number;

  @ApiProperty({
    description: 'Classificação indicativa (ex: 10, 12, 16, 18)',
    example: 14,
  })
  @IsInt()
  @Min(0)
  @Max(18)
  classification: number;

  @ApiProperty({
    description: 'Duração do filme em minutos',
    example: 120,
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({
    description: 'Data de lançamento no formato ISO',
    example: '2025-12-25',
  })
  @IsDateString()
  releaseDate: string;
}
