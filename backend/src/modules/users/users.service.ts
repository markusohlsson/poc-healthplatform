import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

    async findById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ userId });
    }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
  const existing = await this.findByEmail(createUserDto.email);
  if (existing !== null) {
    throw new BadRequestException('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = this.usersRepository.create({
    ...createUserDto,
    passwordHash: hashedPassword,
  });

  return this.usersRepository.save(user);
}
}
