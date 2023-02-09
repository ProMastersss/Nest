import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ type: 'string', example: 'Name', description: 'Name' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: 'Text', description: 'Text' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly text: string;

  @ApiProperty({ type: 'string', example: 'Artist', description: 'Artist' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly artist: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Album ID',
    required: false,
  })
  @IsOptional()
  @IsPositive({ message: 'Must be positive' })
  @Transform(({ value }) => Number(value))
  readonly albumId?: number;
}
