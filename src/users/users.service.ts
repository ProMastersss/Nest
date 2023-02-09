import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, ROLES } from 'src/roles/role.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async create(dto: CreateUserDto, roleName = ROLES.USER) {
    let role;
    try {
      role = await this.roleService.getRoleByName(roleName);
      if (!role) {
        throw new Error();
      }
    } catch (error) {
      throw new BadRequestException('Role undefined');
    }

    try {
      const user = await this.userRepository.create(dto);
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (error) {
      throw new BadRequestException(`User with email ${dto.email} exist`);
    }
  }

  async getUsers() {
    return await this.userRepository.findAll({
      include: [Role],
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: [Role],
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByName(dto.nameRole);
    if (user && role) {
      await user.$add('roles', role);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReson = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
