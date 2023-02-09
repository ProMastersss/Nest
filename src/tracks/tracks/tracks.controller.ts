import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRequest } from 'src/auth/jwt-auth.guard';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { filterFilesHelprer } from './helpers/filter-files.helper';
import { Track } from './track.model';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @ApiOperation({ summary: 'Create track' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: CreateTrackDto })
  @ApiResponse({ status: 201, type: Track })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'audio', maxCount: 1 },
        { name: 'picture', maxCount: 1 },
      ],
      { fileFilter: filterFilesHelprer },
    ),
  )
  create(
    @Body() dto: CreateTrackDto,
    @Req() req: AuthRequest,
    @UploadedFiles()
    files: { audio: Express.Multer.File[]; picture?: Express.Multer.File[] },
  ) {
    const { audio, picture } = files;
    if (!Array.isArray(audio)) {
      throw new BadRequestException('The audio field is required');
    }

    return this.tracksService.create(
      dto,
      req.user,
      audio.at(0),
      Array.isArray(picture) ? picture.at(0) : undefined,
    );
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: 'number' })
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: AuthRequest) {
    return this.tracksService.remove(id, req.user);
  }

  @ApiOperation({ summary: 'Get all tracks' })
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
  @ApiResponse({ status: 200, type: [Track] })
  @Get('/all')
  getAll(@Query('count') count?: number, @Query('offset') offset?: number) {
    return this.tracksService.getAll(count, offset);
  }

  @ApiOperation({ summary: 'Increase listening counter' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Track })
  @Post('/listen/:id')
  listen(@Param('id') id: number) {
    return this.tracksService.listen(id);
  }

  @ApiOperation({ summary: 'Search tracks by query' })
  @ApiBody({ required: true, type: QueryTrackDto })
  @ApiResponse({ status: 200, type: Track })
  @Get('/search')
  search(@Body() query: QueryTrackDto) {
    return this.tracksService.search(query);
  }

  @ApiOperation({ summary: 'Get one track' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Track })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tracksService.getOne(id);
  }
}
