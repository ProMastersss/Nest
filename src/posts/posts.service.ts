import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: Express.Multer.File) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postsRepository.create({
      ...dto,
      user_id: dto.userId,
      image: fileName,
    });
    return post;
  }

  async remove(id: number) {
    try {
      return await this.postsRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't remove post");
    }
  }

  async getAll(count = 10, offset = 0) {
    try {
      return await this.postsRepository.findAll({ offset, limit: count });
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get all posts");
    }
  }

  async getTotalCount() {
    try {
      return await this.postsRepository.count();
    } catch (error) {
      throw new InternalServerErrorException("Сouldn't get total count posts");
    }
  }
}
