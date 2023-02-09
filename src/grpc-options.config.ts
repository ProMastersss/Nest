import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';

export default {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    package: 'hero',
    protoPath: resolve('./src/hero/hero.proto'),
  },
} as MicroserviceOptions;
