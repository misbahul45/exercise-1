import { Module } from '@nestjs/common';
import { PostsController } from './controller/posts/posts.controller';

@Module({
  controllers: [PostsController]
})
export class PostsModule {}
