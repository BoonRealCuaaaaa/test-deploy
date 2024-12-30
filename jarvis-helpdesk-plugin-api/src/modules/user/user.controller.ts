import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { AuthGuard } from '../auth/auth.guard';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getUserContext(@Req() req) {
    const userId = String(req['userId']);
    return this.userService.getContextUser(userId);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto as User);
  }

  @Get(':userId')
  async findOne(@UUIDParam('userId') userId: string) {
    return await this.userService.findOne(userId);
  }

  @Patch(':userId')
  async update(@UUIDParam('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto as User);
  }

  @Delete(':userId')
  async remove(@UUIDParam('userId') userId: string) {
    return await this.userService.delete(userId);
  }
}
