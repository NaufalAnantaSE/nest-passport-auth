import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        description: 'Email pengguna, harus unik.',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password pengguna, minimal 6 karakter.',
        example: 'password123',
    })
    @IsNotEmpty()
    @MinLength(6, { message: 'Password minimal harus 6 karakter' })
    password: string;
}