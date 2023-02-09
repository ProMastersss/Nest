import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleAuth } from 'src/auth/role-auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, ROLES } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Get roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleService.getRoles();
  }

  @ApiOperation({ summary: 'Get role by name' })
  @ApiParam({ name: 'name' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:name')
  getRoleByName(@Param('name') name: string) {
    return this.roleService.getRoleByName(name);
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiBody({ required: true, type: CreateRoleDto })
  @ApiResponse({ status: 201, type: Role })
  @RoleAuth(ROLES.ADMIN)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiBody({ required: true, type: 'number' })
  @ApiResponse({ status: 200, type: 'number' })
  @RoleAuth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
