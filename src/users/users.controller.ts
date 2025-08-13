import { UsersService } from './users.service';
import { Controller, Get, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ProfileV2Docs } from 'src/auth/docs/auth-v2-docs';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly UsersService: UsersService,
    ) { }



    @ProfileV2Docs()
    @HttpCode(200)
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return this.UsersService.getProfile(req.user, req);
    }
}
