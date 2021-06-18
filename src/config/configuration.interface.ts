import INetilionConfiguration from './netilion-configuration.interface';
import IRedisConfiguration from './redis-configuration.interface';
import ISecurityConfiguration from './security-configuration.interface';

export default interface IConfiguration {
  port: number;
  netilion: INetilionConfiguration;
  databaseUrl: string;
  redis: IRedisConfiguration;
  security: ISecurityConfiguration;
  geolocationApiKey: string;
  permittedUserGroupId: number;
  permittedUserGroupName: string;
}
