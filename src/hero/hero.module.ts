import { Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule } from '@nestjs/microservices';
import grpcOptionsConfig from 'src/grpc-options.config';
import { HeroController } from './hero.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...(grpcOptionsConfig as ClientProviderOptions),
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule {}
