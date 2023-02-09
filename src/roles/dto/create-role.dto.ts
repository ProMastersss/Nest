import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ type: 'string', example: 'Admin', description: 'Name' })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'Administrator app',
    description: 'Description',
  })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'Must be not empty' })
  readonly description: string;
}
