import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '@services/user/user.service'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Secret key to sign JWT tokens
      signOptions: { expiresIn: '1h' }, // JWT expires in 1 hour
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
