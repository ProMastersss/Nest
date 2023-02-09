import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleAuth } from 'src/auth/role-auth.decorator';
import { ROLES } from 'src/roles/role.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ required: true, type: CreateUserDto })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto, ROLES.ADMIN);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  @RoleAuth(ROLES.ADMIN)
  @Get()
  getAll() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @RoleAuth(ROLES.ADMIN)
  @Post('/add-role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(ROLES.ADMIN)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
