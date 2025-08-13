import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from './schemas/user-profile.schema';
import { User } from './schemas/user.schema';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class AuthService {
}


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,

    ) { }
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    // Di dalam UsersService
    async createUser(createUserData: { email: string; passwordHash: string }): Promise<User> {
       const existingUser = await this.findUserByEmail(createUserData.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists.');
        }
        const newUser = new this.userModel(createUserData);
        return newUser.save();
    }


    async findUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async getProfile(UserProfile: UserProfile, req: any): Promise<any> {
        const user = await this.findUserById(UserProfile.userId.toString());
        if (!user) {
            throw new UnauthorizedException('Kredensial tidak valid');
        }
        return {
            _id: user._id,
            email: user.email,
        };
    }
}
