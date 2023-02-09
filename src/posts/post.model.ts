import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

interface PostCreationAttr {
  title: string;
  content: string;
  image: string;
  user_id: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttr> {
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

  @ApiProperty({ type: 'string', example: 'title', description: 'Title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'Content of post',
    description: 'Content',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    type: 'string',
    example: '/path/to/image',
    description: 'Image of post',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ type: 'number', example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({
    type: User,
    description: 'List roles of user',
    required: false,
  })
  @BelongsTo(() => User)
  author: User;

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
