import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get()
  findUsers(){
    return this.userService.findUsers()
  }

  @Get('/test')
  userRoute(){
    return 'hello user'
  }
}
