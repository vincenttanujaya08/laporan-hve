import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Field Work Report System API')
    .setDescription('Dokumentasi API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'HVE API Documentation',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               
      forbidNonWhitelisted: true,    
      transform: true,               
    }),
  );

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Backend is running on: http://localhost:${port}`);
  console.log(`API Documentation available at: http://localhost:${port}/docs`);
}
bootstrap();