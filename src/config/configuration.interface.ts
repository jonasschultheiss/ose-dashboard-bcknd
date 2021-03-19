import IAPIConfiguration from './api-configuration.interface';
import INetilionConfiguration from './netilion-configuration.interface';
import IRedisConfiguration from './redis-configuration.interface';

export default interface IConfiguration {
  port: number;
  netilion: INetilionConfiguration;
  databaseUrl: string;
  redis: IRedisConfiguration;
  api: IAPIConfiguration;
}
