import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ type: 'string', example: 'Album', description: 'Album' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: 'Author', description: 'Author' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly author: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    example: '/path/to/image',
    description: 'Image of album',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Must be string' })
  readonly picture?: string;
}
