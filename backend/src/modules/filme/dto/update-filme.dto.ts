import { IsOptional, IsString, IsInt, IsDateString, Min, Max, Length, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFilmeDto {
  @ApiPropertyOptional({ description: 'ID do filme', example: 'a3c08c6e-1234-4567-abcd-98765fgh4321' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({ description: 'Título do filme', example: 'Matrix Reloaded' })
  @IsString()
  @Length(1, 255)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição do filme', example: 'A continuação da luta contra a Matrix.' })
  @IsString()
  @Length(1, 1000)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Gênero (ID)', example: 2 })
  @IsInt()
  @Min(0)
  @IsOptional()
  gender?: number;

  @ApiPropertyOptional({ description: 'Classificação indicativa', example: 16 })
  @IsInt()
  @Min(0)
  @Max(18)
  @IsOptional()
  classification?: number;

  @ApiPropertyOptional({ description: 'Duração em minutos', example: 150 })
  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({ description: 'Data de lançamento (ISO)', example: '2025-12-31' })
  @IsDateString()
  @IsOptional()
  releaseDate?: string;
}
