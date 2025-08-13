import { Body, Controller, Get, HttpCode, Post, UseGuards, Request} from "@nestjs/common";
import { AuthService } from "./auth.service"; 
import { LoginDto } from "./dto/login.dto";
import { localStrategyGuard } from "./guards/passport-local.guard";
import { JwtAuthGuard } from "./guards/passport-jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoginV2Docs, ProfileV2Docs, RegisterV2Docs } from "./docs/auth-v2-docs";



@ApiBearerAuth()
@ApiTags('passport-auth')
@Controller('auth-v2')
export class PassportAuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @LoginV2Docs()
    @HttpCode(200)
    @Post('login')
    @UseGuards(localStrategyGuard)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @RegisterV2Docs()
    @HttpCode(200)
    @Post('register')
    async register(@Body() registerDto: LoginDto) {
        return this.authService.register(registerDto);
    }

    @ProfileV2Docs()
    @HttpCode(200)
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user, req);
    }
}