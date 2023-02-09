import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'email@email.com',
    description: 'Email',
  })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ type: 'string', example: 'password', description: 'Password' })
  @IsString({ message: 'Must be string' })
  @Length(3, 16, { message: 'Must be from 3 to 16 characters' })
  readonly password: string;
}
