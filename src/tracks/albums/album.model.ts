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

interface CreateAlbumAttr {
  name: string;
  author: string;
  user_id: number;
  picture?: string;
}

@Table({ tableName: 'albums' })
export class Album extends Model<Album, CreateAlbumAttr> {
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

  @ApiProperty({
    type: 'string',
    example: 'Name album',
    description: 'Music album',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Beethoven',
    description: 'Name author of album',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @ApiProperty({
    type: 'string',
    example: '/path/to/image',
    description: 'Image of album',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  picture?: string;

  @ApiProperty({ type: 'number', example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({
    type: () => User,
    description: 'User',
  })
  @BelongsTo(() => User)
  user: User;

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
