import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/userEntity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, NestFactory } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { FilmsController } from './films/films.controller';
import { FilmsModule } from './films/films.module';
import { FilmsEntities } from './films/entities/filmesEntities';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env.development.local' , ]
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port:Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      
      entities:[UserEntity , FilmsEntities],
      migrations:[`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun:true
    })
    ,UserModule,AuthModule, JwtModule, FilmsModule, CacheModule.register()],
  controllers: [FilmsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],

 
})
export class AppModule {}
