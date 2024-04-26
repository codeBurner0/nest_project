import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CONSTANTS } from 'src/constants/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  public users: User[] = [
    {
      id: 1,
      username: 'ankit',
      password: 'ankit',
      email: 'ankit@gmail.com',
      role: CONSTANTS.ROLES.ADMIN,
    },
    {
      id: 2,
      username: 'neeraj',
      password: 'neeraj',
      email: 'neeraj@gmail.com',
      role: CONSTANTS.ROLES.USER,
    },
  ];

  createUser(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return this.userRepository.save(user);
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(email: string): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { email: email },
    };
    return this.userRepository.findOne(options);
  }

  getUserByUserName(username: string) {
    return this.users.find((user) => {
      return user.username === username;
    });
  }
}
