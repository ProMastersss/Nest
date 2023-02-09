import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    try {
      return await this.roleRepository.create(dto);
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't create role");
    }
  }

  async getRoles() {
    try {
      return await this.roleRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get all roles");
    }
  }

  async getRoleByName(name: string) {
    try {
      return await this.roleRepository.findOne({ where: { name } });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get role by name");
    }
  }

  async remove(id: number) {
    try {
      return await this.roleRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't remove role");
    }
  }
}
