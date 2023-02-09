import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface Hero {
  id: number;
  name: string;
}

export interface HeroById {
  id: number;
}

interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
}

@Controller('grpc')
export class HeroController implements OnModuleInit {
  private heroService;
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id });
  }

  @GrpcMethod('HeroService')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
