import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/userEntity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
