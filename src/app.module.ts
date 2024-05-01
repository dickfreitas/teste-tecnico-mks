import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/userEntity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { FilmsModule } from './films/films.module';
import { FilmsEntities } from './films/entities/filmesEntities';

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
    ,UserModule,AuthModule, JwtModule, FilmsModule],
  controllers: [FilmsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
