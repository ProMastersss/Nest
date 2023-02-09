import { BadRequestException } from '@nestjs/common';
import { AuthRequest } from 'src/auth/jwt-auth.guard';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export function filterFilesHelprer(
  req: AuthRequest,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  let regExp;
  switch (file.fieldname) {
    case 'picture':
      regExp = /(jpeg|png)/;
      break;

    case 'audio':
      regExp = /mpeg/;
      break;

    default:
      callback(
        new BadRequestException('Field ' + file.fieldname + ' undefined'),
        false,
      );
  }

  if (file.mimetype.match(regExp)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException('Invalid file type for ' + file.fieldname),
      false,
    );
  }
}
