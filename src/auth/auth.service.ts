import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: User): string {
    console.log(JSON.stringify(payload));
    return this.jwtService.sign({
      id : payload.id,
      username : payload.username
    });
  }
}
