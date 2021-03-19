import IConfiguration from './configuration.interface';

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  netilion: {
    url: process.env.NETILION_URL,
    authurl: process.env.NETILION_AUTHURL,
  },
  databaseUrl: process.env.DB_URL,
  redis: {
    ttl: parseInt(process.env.REDIS_TTL, 10),
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
  api: {
    authorization: process.env.API_AUTHORIZATION,
    key: process.env.API_KEY,
  },
});
