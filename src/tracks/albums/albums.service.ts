import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/user.model';
import { Album } from './album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album) private albumRepository: typeof Album,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateAlbumDto, user: User, picture?: Express.Multer.File) {
    try {
      let pic;
      if (picture) {
        pic = await this.filesService.createFile(picture);
      }

      const album = await this.albumRepository.create({
        ...dto,
        user_id: user.id,
        picture: pic,
      });
      if (album) {
        return album;
      }
      throw new Error();
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't create album");
    }
  }

  async remove(id: number, user: User) {
    try {
      const findedUser = await this.albumRepository.findOne({
        where: { id, user_id: user.id },
      });

      if (findedUser.picture) {
        await this.filesService.removeFile(findedUser.picture);
      }

      await findedUser.destroy();
      return id;
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't delete album");
    }
  }
}
