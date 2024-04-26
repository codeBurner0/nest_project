import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { log } from 'console';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    console.log('hello');
    const user: User = await this.userService.findUser(email);
    console.log("validate",user);
    if (user === undefined) throw new UnauthorizedException();
    if (user !== undefined && user.password === password) {
      console.log('hii');
      return user;
    } else {
      console.log('bye');
      throw new UnauthorizedException();
    }
  }

  async test() {
    console.log(`test`);
    return null
  }
}
