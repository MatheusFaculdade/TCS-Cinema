import { IsUUID, IsString, Length, Matches, IsInt, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIngressoDto {
  @ApiPropertyOptional({ description: 'ID do ingresso', example: '97ffbc9b-7390-4ea7-b77f-7db1548f9056' })
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ description: 'ID da sessão relacionada', example: 'c4c3487f-abc1-4dd0-9ec6-0f0fc5efb987' })
  @IsUUID()
  @IsOptional()
  sessaoId?: string;

  @ApiPropertyOptional({ description: 'Nome do cliente', example: 'Maria da Silva' })
  @IsString()
  @Length(1, 255)
  @IsOptional()
  cliente?: string;

  @ApiPropertyOptional({ description: 'CPF do cliente', example: '12345678900' })
  @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos' })
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional({ description: 'Assento reservado', example: 'B12' })
  @IsString()
  @Length(1, 10)
  @IsOptional()
  assento?: string;

  @ApiPropertyOptional({ description: 'Valor do pagamento em centavos', example: 2500 })
  @IsInt()
  @Min(0)
  @IsOptional()
  pagamento?: number;
}
