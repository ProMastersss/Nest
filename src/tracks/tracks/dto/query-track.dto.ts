import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';

export class QueryTrackDto extends PartialType(CreateTrackDto) {}
