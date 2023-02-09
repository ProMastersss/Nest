import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ type: 'number', example: 1, description: 'User ID' })
  @IsNumber({}, { message: 'Must be number' })
  @IsPositive({ message: 'Must be positive' })
  readonly userId: number;

  @ApiProperty({ type: 'string', example: 'Reason', description: 'Reason ban' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly banReason: string;
}
