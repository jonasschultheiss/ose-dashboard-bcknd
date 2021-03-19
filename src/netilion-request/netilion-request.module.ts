import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { NetilionRequestService } from './netilion-request.service';
import { OAuthService } from './oauth.service';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('redis.ttl'),
        store: redisStore,
        url: configService.get('redis.url'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OAuthService, NetilionRequestService],
  exports: [OAuthService, NetilionRequestService],
})
export class NetilionRequestModule {}
