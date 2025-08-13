import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class UserProfile extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    tanggalLahir: Date;

    @Prop()
    bio: string;

    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);