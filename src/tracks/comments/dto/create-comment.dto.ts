import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: 'string', example: 'Text', description: 'Text' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly text: string;

  @ApiProperty({ type: 'number', example: 1, description: 'Track ID' })
  @IsNumber({}, { message: 'Must be number' })
  @IsPositive({ message: 'Must be positive' })
  readonly trackId: number;
}
