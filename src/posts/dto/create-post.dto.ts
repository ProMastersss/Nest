import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: 'string', example: 'Title', description: 'Title' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    example: 'Text content',
    description: 'Text content',
  })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly content: string;

  @ApiProperty({ type: 'number', example: 1, description: 'User ID' })
  @IsPositive({ message: 'Must be positive' })
  @Transform(({ value }) => Number(value))
  readonly userId: number;
}
