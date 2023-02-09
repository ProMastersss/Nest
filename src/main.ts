import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RoleAuthGuard } from './auth/role-auth.guard';
import grpcOptionsConfig from './grpc-options.config';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js app')
    .setDescription('App tutorial nest.js')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RoleAuthGuard(jwtService, reflector));

  app.connectMicroservice<MicroserviceOptions>(grpcOptionsConfig);
  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
