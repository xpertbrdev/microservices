import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for all origins
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  const port = process.env.PORT || 3000;
  
  // Listen on all interfaces (0.0.0.0) for external access
  await app.listen(port, '0.0.0.0');
  
  logger.log(`🚀 Data Provider Service running on: http://0.0.0.0:${port}`);
  logger.log(`📊 GraphQL Playground: http://0.0.0.0:${port}/graphql`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

