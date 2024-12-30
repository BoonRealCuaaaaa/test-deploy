import * as process from 'process';
export const configuration = () => ({
  logLvl: process.env.LOG_LVL || 'debug',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.APP_PORT ?? '3000', 10),
  swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  aiModuleApiUrl: process.env.AI_MODULE_API_URL || 'http://localhost:6666',
  db: {
    host: process.env.DATABASE_HOST,
    maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS ?? '100', 10),
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
    type: process.env.DATABASE_TYPE,
    username: process.env.DATABASE_USERNAME,
  },
});
