import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from './assets/assets.module';
import configuration from './config/configuration';
import { ModelsModule } from './models/models.module';
import { NetilionRequestModule } from './netilion-request/netilion-request.module';
import { ProductsModule } from './products/products.module';
import { StatusModule } from './status/status.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('databaseUrl'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/**/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: false,
        logging: true,
        logger: 'file',
        retryAttempts: 10,
        ssl: configService.get('NODE_ENV') === 'production',
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AssetsModule,
    ProductsModule,
    StatusModule,
    TagsModule,
    ModelsModule,
    NetilionRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
