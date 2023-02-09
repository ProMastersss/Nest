import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRequest } from 'src/auth/jwt-auth.guard';
import { Album } from './album.model';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Create album' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: CreateAlbumDto })
  @ApiResponse({ status: 201, type: Album })
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(
    @Body() dto: CreateAlbumDto,
    @Req() req: AuthRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /image\/(jpeg|png)/ })],
        fileIsRequired: false,
      }),
    )
    picture?: Express.Multer.File,
  ) {
    return this.albumsService.create(dto, req.user, picture);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: 'number' })
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: AuthRequest) {
    return this.albumsService.remove(id, req.user);
  }
}
