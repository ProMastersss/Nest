import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/user.model';
import { Album } from './albums/album.model';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';
import { Comment } from './comments/comment.model';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { Track } from './tracks/track.model';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  providers: [FilesService, TracksService, AlbumsService, CommentsService],
  controllers: [TracksController, AlbumsController, CommentsController],
  imports: [
    SequelizeModule.forFeature([User, Track, Album, Comment]),
    FilesModule,
  ],
})
export class TracksModule {}
