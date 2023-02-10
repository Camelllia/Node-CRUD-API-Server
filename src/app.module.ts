import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude({ path: 'user/createUser', method: RequestMethod.POST })
    .exclude({ path: 'user/user_all', method: RequestMethod.GET })
    .forRoutes(UserController);
  }
}
