import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from 'src/tracks/tracks/track.model';
import { User } from 'src/users/user.model';

interface CreateCommentAttr {
  text: string;
  track_id: number;
  user_id: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CreateCommentAttr> {
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
    allowNull: false,
  })
  text: string;

  @ApiProperty({ type: 'number', example: 1, description: 'Track ID' })
  @ForeignKey(() => Track)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  track_id: number;

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
