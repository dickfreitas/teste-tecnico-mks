import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { sign } from 'crypto';


@Module({
  imports:[UserModule,
    JwtModule.registerAsync({
      useFactory:()=>({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:process.env.JWT_TIMEIN}
      })
      
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
