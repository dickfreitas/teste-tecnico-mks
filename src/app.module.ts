import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/interface/userEntity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';

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
      
      entities:[UserEntity],
      migrations:[`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun:true
    })
    ,UserModule,AuthModule, JwtModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
