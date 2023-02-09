import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/user.model';
import { Comment } from '../comments/comment.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { Track } from './track.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private filesService: FilesService,
  ) {}

  async create(
    dto: CreateTrackDto,
    user: User,
    audio: Express.Multer.File,
    picture?: Express.Multer.File,
  ) {
    try {
      const audioPath = await this.filesService.createFile(audio);
      let picturePath;
      if (picture) {
        picturePath = await this.filesService.createFile(picture);
      }
      const track = await this.trackRepository.create({
        ...dto,
        audio: audioPath,
        picture: picturePath,
        album_id: dto.albumId,
        user_id: user.id,
      });
      if (track) {
        return track;
      }
      throw new Error("Сouldn't create track");
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number, user: User) {
    try {
      const deleteCount = await this.trackRepository.destroy({
        where: { id, user_id: user.id },
      });
      if (deleteCount > 0) {
        return id;
      }
      throw new Error();
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't delete track");
    }
  }

  async getOne(id: number) {
    try {
      return await this.trackRepository.findOne({
        where: { id },
        include: [
          { model: Comment, attributes: ['id', 'text'] },
          { model: User, attributes: ['id', 'email'] },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get track " + id);
    }
  }

  async getAll(count = 10, offset = 0) {
    try {
      return await this.trackRepository.findAll({ offset, limit: count });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get all tracks");
    }
  }

  async listen(id: number) {
    try {
      const track = await this.getOne(id);
      return await track.update({ listen: track.listen + 1 });
    } catch (error) {
      throw new InternalServerErrorException(
        "Сouldn't increase listening counter of track",
      );
    }
  }

  async search(query: QueryTrackDto) {
    try {
      const where = [];
      Object.keys(query).forEach((field) => {
        where.push({ [field]: { [Op.like]: `%${query[field]}%` } });
      });

      return await this.trackRepository.findAll({ where: { [Op.and]: where } });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't found tracks by query");
    }
  }
}
