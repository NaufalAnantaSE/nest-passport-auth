// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);