import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ForumModule } from './forum/forum.module.js';
import { CategoryModule } from './category/category.module.js';
import { ThreadModule } from './thread/thread.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'l1ghtf0rum'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    UserModule,
    AuthModule,
    ForumModule,
    CategoryModule,
    ThreadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
