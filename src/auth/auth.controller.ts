import { Body, Controller, HttpCode, HttpStatus, Post,Get, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto); 

    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getProfile(@Request() req)
    {
        return req.user
    }
}
