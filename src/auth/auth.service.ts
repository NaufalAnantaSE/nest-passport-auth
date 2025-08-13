import { User } from '../users/schemas/user.schema';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Method publik utama untuk proses login.
     * Ini adalah satu-satunya method yang perlu dipanggil oleh Controller.
     */
    async login(loginDto: LoginDto): Promise<any> {

        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Kredensial tidak valid');
        }


        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);


        return {
            access_token: accessToken,
            user: {
                _id: user._id,
                email: user.email,

            },
        };
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);

        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, ...result } = user.toObject();
            return result;
        }

        return null;
    }


async register(registerDto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Simpan user baru (validasi duplikat ditangani oleh UsersService)
    const createdUser = await this.usersService.createUser({
        email: registerDto.email,
        passwordHash: hashedPassword,
    });

        // Ubah ke object biasa dan hilangkan passwordHash
        const { passwordHash, ...safeUser } = createdUser.toObject();
        return safeUser as Omit<User, 'passwordHash'>;
    }
}


