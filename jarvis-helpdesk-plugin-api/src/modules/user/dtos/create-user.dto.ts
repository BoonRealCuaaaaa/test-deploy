import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'helpdesk@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
