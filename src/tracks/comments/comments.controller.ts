import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRequest } from 'src/auth/jwt-auth.guard';
import { Comment } from './comment.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiBody({ required: true, type: CreateCommentDto })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: AuthRequest) {
    return this.commentsService.create(dto, req.user);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: 'number' })
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: AuthRequest) {
    return this.commentsService.remove(id, req.user);
  }
}
