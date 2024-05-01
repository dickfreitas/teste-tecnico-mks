
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDTO } from 'src/auth/dtos/UserTokenDTO';
import { TokenDTO } from 'src/auth/dtos/tokenDTO';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Se não houver nenhuma função necessária, permita o acesso
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(authorization)

    if (!authorization) {
      throw new Error('Authorization token not provided');
    }

    
    try {
      const tokenPayload = this.jwtService.verify(authorization, { secret: process.env.JWT_SECRET });
      console.log({ secret: process.env.JWT_SECRET })
      // Verificar se o usuário possui uma função necessária
      const hasRequiredRole = requiredRoles.some((role) => role === tokenPayload.typeUser);
      
      if (!hasRequiredRole) {
        throw new Error('User does not have required role');
      }

      return true;
    } catch (error) {
      
      throw new Error('Invalid authorization token');
    }
  }
}