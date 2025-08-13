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
    .addServer(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Custom options for Swagger UI
  const customOptions = {
    customSiteTitle: 'API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/swagger-custom.js'
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
