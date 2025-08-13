import { Body, Controller, Get, HttpCode, Post, UseGuards, Request} from "@nestjs/common";
import { AuthService } from "./auth.service"; 
import { LoginDto } from "./dto/login.dto";
import { localStrategyGuard } from "./guards/passport-local.guard";
import { JwtAuthGuard } from "./guards/passport-jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiBearerAuth()
@ApiTags('passport-auth')
@Controller('auth-v2')
export class PassportAuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @HttpCode(200)
    @Post('login')
    @UseGuards(localStrategyGuard)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @HttpCode(200)
    @Post('register')
    async register(@Body() registerDto: LoginDto) {
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user, req);
    }
}