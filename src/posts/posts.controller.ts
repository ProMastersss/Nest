import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RoleAuth } from 'src/auth/role-auth.decorator';
import { ROLES } from 'src/roles/role.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: CreatePostDto })
  @ApiResponse({ status: 201, type: PostModel })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'png|jpeg' })],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.postsService.create(dto, image);
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiBody({ required: true, type: 'number' })
  @ApiResponse({ status: 200, type: 'number' })
  @RoleAuth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({
    name: 'count',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: [PostModel],
    headers: {
      'X-Total-Count': {
        schema: {
          type: 'string',
        },
        description: 'Total count post items',
      },
    },
  })
  @Get('/all')
  async getAll(
    @Res() res: Response,
    @Query('count') count?: number,
    @Query('offset') offset?: number,
  ) {
    res
      .setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      .setHeader(
        'X-Total-Count',
        String(await this.postsService.getTotalCount()),
      )
      .json(await this.postsService.getAll(count, offset));
  }
}
