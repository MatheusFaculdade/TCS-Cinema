import { IsUUID, IsString, Length, Matches, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngressoDto {
  @ApiProperty({ description: 'ID da sessão relacionada', example: 'c4c3487f-abc1-4dd0-9ec6-0f0fc5efb987' })
  @IsUUID()
  sessaoId: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'Maria da Silva' })
  @IsString()
  @Length(1, 255)
  cliente: string;

  @ApiProperty({ description: 'CPF do cliente (apenas números)', example: '12345678900' })
  @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos' })
  cpf: string;

  @ApiProperty({ description: 'Assento reservado', example: 'B12' })
  @IsString()
  @Length(1, 10)
  assento: string;

  @ApiProperty({ description: 'Valor do pagamento em centavos', example: 2500 })
  @IsInt()
  @Min(0)
  pagamento: number;
}
