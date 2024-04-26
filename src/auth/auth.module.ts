import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'ankitanande3j7pcantinolabspvtltd',
      signOptions: {
        expiresIn: '120s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy,AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
