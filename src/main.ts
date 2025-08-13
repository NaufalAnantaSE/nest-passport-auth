import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Dokumentasi User Auth')
    .setDescription('Dokumentasi API User Auth')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .addServer('https://nest-auth-api.dnn.web.id')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Custom options for Swagger UI
  const customOptions = { 
    swaggerOptions: {
      urls: [{ url: '/api-json', name: 'API' }],
    },
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.21.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.21.0/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.21.0/swagger-ui.css',
  };
  
  SwaggerModule.setup('api-docs', app, document, customOptions);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();