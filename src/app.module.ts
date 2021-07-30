import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AssetsModule } from './assets/assets.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MeshesModule } from './meshes/meshes.module';
import { ModelsModule } from './models/models.module';
import { NetilionRequestModule } from './netilion-request/netilion-request.module';
import { ProductsModule } from './products/products.module';
import { StatusModule } from './status/status.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('databaseUrl'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: configService.get('NODE_ENV') === 'production',
        logging: true,
        logger: 'file',
        retryAttempts: 10,
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : undefined
      }),
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    AssetsModule,
    ProductsModule,
    StatusModule,
    TagsModule,
    ModelsModule,
    NetilionRequestModule,
    AuthModule,
    UsersModule,
    MeshesModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [CryptoService]
})
export class AppModule {}
