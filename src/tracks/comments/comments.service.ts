import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { TracksService } from '../tracks/tracks.service';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
    private trackService: TracksService,
  ) {}

  async create(dto: CreateCommentDto, user: User) {
    try {
      const track = await this.trackService.getOne(dto.trackId);
      if (!track) {
        throw new Error('Not found track ' + dto.trackId);
      }

      const comment = await this.commentsRepository.create({
        ...dto,
        track_id: track.id,
        user_id: user.id,
      });
      if (comment) {
        return comment;
      }
      throw new Error("Сouldn't create comment");
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number, user: User) {
    try {
      const deleteCount = await this.commentsRepository.destroy({
        where: { id, user_id: user.id },
      });
      if (deleteCount > 0) {
        return id;
      }
      throw new Error();
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't delete comment");
    }
  }
}
