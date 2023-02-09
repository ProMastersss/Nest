import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { HeroModule } from './hero/hero.module';
import { JsonRpcController } from './json-rpc/json-rpc.controller';
import { Post } from './posts/post.model';
import { PostsModule } from './posts/posts.module';
import { Role } from './roles/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Album } from './tracks/albums/album.model';
import { Comment } from './tracks/comments/comment.model';
import { TracksModule } from './tracks/tracks.module';
import { Track } from './tracks/tracks/track.model';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.' + process.env.NODE_ENV + '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [User, Role, UserRoles, Post, Album, Comment, Track],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PostsModule,
    FilesModule,
    TracksModule,
    HeroModule,
  ],
  providers: [],
  exports: [],
  controllers: [JsonRpcController],
})
export class AppModule {}
