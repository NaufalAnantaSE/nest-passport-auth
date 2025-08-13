import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Email pengguna yang terdaftar.',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password pengguna yang terdaftar.',
        example: 'password123',
    })
    @IsNotEmpty()
    password: string;
}