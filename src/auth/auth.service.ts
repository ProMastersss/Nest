import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateJwtToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User with email exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return this.generateJwtToken(user);
  }

  private generateJwtToken(user: User) {
    const { id, email, roles } = user;
    const payload = { id, email, roles };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid username or password');
  }
}
