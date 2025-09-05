import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => plainToInstance(ReturnUserDto, user));
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findById(+id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToInstance(ReturnUserDto, user);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.usersService.create(dto);
    return plainToInstance(ReturnUserDto, user);
  }
}
