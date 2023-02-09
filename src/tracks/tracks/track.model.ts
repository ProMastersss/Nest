import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/tracks/comments/comment.model';
import { User } from 'src/users/user.model';
import { Album } from '../albums/album.model';

interface CreateTrackAttr {
  name: string;
  text: string;
  artist: string;
  audio: string;
  picture?: string;
  user_id: number;
  album_id: number;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, CreateTrackAttr> {
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
    example: 'Name track',
    description: 'Music album',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Text track',
    description: 'Text song',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({ type: 'string', example: 'Artist', description: 'Beethoven' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  artist: string;

  @ApiProperty({
    example: 1,
    description: 'Count of auditions',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  listen: number;

  @ApiProperty({
    example: '/path/to/image',
    description: 'Image of track',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  picture?: string;

  @ApiProperty({
    type: 'string',
    example: '/path/to/audio',
    description: 'Audio of track',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  audio: string;

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
    example: 1,
    description: 'Track ID',
    required: false,
  })
  @ForeignKey(() => Album)
  @Column({
    type: DataType.INTEGER,
  })
  album_id?: number;

  @ApiProperty({
    type: Album,
    description: 'Album of this track',
    required: false,
  })
  @BelongsTo(() => Album)
  album?: Album;

  @ApiProperty({
    type: [Comment],
    description: 'Track comments',
    required: false,
  })
  @HasMany(() => Comment)
  comments?: Comment[];

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
