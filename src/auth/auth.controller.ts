import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JsonRPCServer } from 'src/json-rpc/json-rpc-server';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jsonRPCServer: JsonRPCServer,
  ) {
    this.jsonRPCServer.getServer().addMethod('login', ({ email, password }) => {
      return this.authService.login({ email, password });
    });
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ required: true, type: CreateUserDto })
  @ApiResponse({
    status: 200,
    schema: { example: { token: 'token' } },
  })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiBody({ required: true, type: CreateUserDto })
  @ApiResponse({
    status: 200,
    schema: { example: { token: 'token' } },
  })
  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
