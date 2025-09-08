import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMockModule } from './app-mock.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    // Criar aplicação NestJS com módulo mock
    const app = await NestFactory.create(AppMockModule);
    const configService = app.get(ConfigService);

    // Configurar CORS
    app.enableCors({
      origin: true,
      credentials: true,
    });

    // Configurar validação global
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));

    // Configurar porta
    const port = configService.get<number>('PORT', 3000);
    const host = '0.0.0.0';

    await app.listen(port, host);

    logger.log(`🚀 Data Provider Service (MOCK MODE) running on: http://${host}:${port}`);
    logger.log(`📊 GraphQL Playground: http://${host}:${port}/graphql`);
    logger.log('🔧 Using mock data (no database connection required)');

  } catch (error) {
    logger.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();

