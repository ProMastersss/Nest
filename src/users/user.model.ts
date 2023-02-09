import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Album } from 'src/tracks/albums/album.model';
import { Track } from 'src/tracks/tracks/track.model';

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'UID',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ type: 'string', example: 'password', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    type: 'string',
    example: 'emaol@email.com',
    description: 'Email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: false, description: 'Banned', required: false })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'bad user',
    description: 'Ban reason',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReson: string;

  @ApiProperty({
    type: () => [Role],
    description: 'List roles of user',
  })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @ApiProperty({
    type: () => [Post],
    description: 'List posts of user',
    required: false,
  })
  @HasMany(() => Post)
  posts?: Post[];

  @ApiProperty({
    type: () => [Album],
    description: 'Almums of user',
    required: false,
  })
  @HasMany(() => Album)
  albums?: Album[];

  @ApiProperty({
    type: () => [Track],
    description: 'Tracks of user',
    required: false,
  })
  @HasMany(() => Track)
  tracks?: Track[];
}
