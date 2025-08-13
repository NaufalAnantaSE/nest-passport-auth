import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
