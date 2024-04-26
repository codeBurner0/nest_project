import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { CONSTANTS } from 'src/constants/constants';

@Controller('/a')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): any {
    // console.log('login route',req);
    const token = this.authService.generateToken(req.user);
    return {
      message: 'user logged in successfully',
      token: token,
      role: req.user.role,
    };
  }

  @Get('/admin')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ADMIN))
  adminRoute(@Request() req): string {
    return 'admin route' + JSON.stringify(req.user);
  }

  @Get('/user')
  // @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.USER))
  userRoute(@Request() req): string {
    return 'user route' + JSON.stringify(req.user);
  }
}
