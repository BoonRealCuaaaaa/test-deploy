import * as process from 'process';
export const configuration = () => ({
  logLvl: process.env.LOG_LVL || 'debug',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.APP_PORT ?? '6666', 10),
  swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  knowledgeBase: {
    token: process.env.KB_TOKEN,
    endpoint: process.env.KB_ENDPOINT,
    assistantId: process.env.KB_ASSISTANT_ID,
  },
});
