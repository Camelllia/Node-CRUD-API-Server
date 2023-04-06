import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PostModule } from './post/post.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule 등록
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            envFilePath: '.env',
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/createUser', method: RequestMethod.POST })
      .exclude({ path: 'user/login', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
