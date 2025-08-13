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
    .addServer('https://nest-auth-api.dnn.web.id', 'Production')
    .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Development')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Custom options for Swagger UI
  const customOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      syntaxHighlight: {
        activate: true,
        theme: 'agate'
      }
    },
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.2/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.2/swagger-ui-standalone-preset.js'
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.2/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.7.2/swagger-ui-standalone-preset.min.css'
    ]
  };
  
  SwaggerModule.setup('api-docs', app, document, customOptions);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
