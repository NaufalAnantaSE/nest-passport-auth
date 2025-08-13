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
    .addServer('https://nest-auth-api.dnn.web.id')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  // Custom options for Swagger UI with specific version and integrity hashes
  const customOptions = {
    customSiteTitle: 'API Documentation',
    customfavIcon: 'https://swagger.io/favicon.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js'
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css'
    ],
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      deepLinking: true
    }
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();