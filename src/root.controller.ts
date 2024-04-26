import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('app')
export class RootController {
  constructor() {}

  

  @Get('/')
  start():string{
    return 'hello'
  }
}
