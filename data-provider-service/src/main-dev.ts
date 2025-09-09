import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppDevModule } from './app-dev.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppDevModule);

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
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 Data Provider Service (DEV MODE) running on: http://0.0.0.0:${port}`);
    console.log(`📊 GraphQL Playground: http://0.0.0.0:${port}/graphql`);
    console.log(`🔧 Using mock data with DataLoaders (no database connection required)`);
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();

