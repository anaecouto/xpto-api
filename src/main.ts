import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // isso faz com que apenas o que estiver no validation pipe chegue na requisição
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('XPTO-API')
    .setDescription(
      'Bem-vindo(a) a XPTO! Aqui você encontra a documentação completa da nossa api!',
    )
    .setVersion('1.0.0')
    .addTag('Módulos')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {
    title: 'XPTO-API',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: false,
  };

  await RedocModule.setup('/api/docs', app, document, redocOptions);
  await app.listen(process.env.PORT);
}
bootstrap();
