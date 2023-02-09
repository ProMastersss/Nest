import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const typeFile = this.getTypeFile(file);
      const fileName = uuid.v4() + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, '..', 'static', typeFile);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fullPath = path.join(filePath, fileName);
      fs.writeFileSync(fullPath, file.buffer);
      return path.join(typeFile, fileName);
    } catch (error) {
      throw new InternalServerErrorException(
        'Аn error occurred while writing the file',
      );
    }
  }

  async removeFile(path: string) {
    try {
      await fs.rmSync(path);
    } catch (error) {
      throw new InternalServerErrorException('Connot remove file ' + path);
    }
  }

  private getTypeFile(file: Express.Multer.File) {
    const [, type] = file.mimetype.match(/(\D+)\//);

    if (type) {
      return type;
    }

    throw new InternalServerErrorException('Undefined file type');
  }
}
