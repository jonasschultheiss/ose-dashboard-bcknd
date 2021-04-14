import IConfiguration from './configuration.interface';

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  netilion: {
    url: process.env.NETILION_URL,
    authurl: process.env.NETILION_AUTHURL,
    redirectURI: process.env.NETILION_REDIRECT_URI,
    clientId: process.env.NETILION_CLIENT_ID,
    clientSecret: process.env.NETILION_CLIENT_SECRET
  },
  databaseUrl: process.env.DATABASE_URL,
  redis: {
    ttl: parseInt(process.env.REDIS_TTL, 10),
    url: process.env.REDIS_URL
  },
  security: {
    jwtSecret: process.env.SECURITY_JWT_SECRET,
    jwtExpiresIn: process.env.SECURITY_JWT_EXPIRES_IN,
    encryptionSecret: process.env.SECURITY_ENCRYPTION_SECRET
  },
  geolocationApiKey: process.env.GEOLOCATION_API_KEY,
  permittedUserGroupId: parseInt(process.env.PERMITTED_USERGROUP_ID, 10),
  permittedUserGroupName: process.env.PERMITTED_USERGROUP_NAME
});
