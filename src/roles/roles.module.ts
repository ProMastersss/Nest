import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Role } from './role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, User])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
