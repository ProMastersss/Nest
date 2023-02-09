import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttr {
  name: string;
  decription: string;
}

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'ID',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ type: 'string', example: 'Admin', description: 'Name' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Administrator app',
    description: 'Description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];

  @ApiProperty({
    type: 'number',
    example: 1670000000,
    description: 'Date creation timestamp',
  })
  createdAt: number;

  @ApiProperty({
    type: 'number',
    example: 1670000000,
    description: 'Date creation timestamp',
  })
  updatedAt: number;
}
