import { FederationGateway } from './gateway';
import * as process from 'process';

// Configuração de variáveis de ambiente
const PORT = parseInt(process.env.PORT || '4000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

// Instância do gateway
let gateway: FederationGateway;

async function startServer() {
  try {
    console.log('🔧 Environment:', NODE_ENV);
    console.log('🔧 Port:', PORT);
    
    // Criar e iniciar o gateway
    gateway = new FederationGateway();
    await gateway.start(PORT);

    // Health check endpoint via HTTP (opcional)
    if (NODE_ENV === 'development') {
      console.log('\n📋 Available endpoints:');
      console.log(`  - GraphQL: http://localhost:${PORT}/`);
      console.log(`  - Health: Use GraphQL query { __typename }`);
    }

  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.log(`\n🔄 Received ${signal}, shutting down gracefully...`);
  
  try {
    if (gateway) {
      await gateway.stop();
    }
    console.log('✅ Gateway shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}

// Signal handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();

