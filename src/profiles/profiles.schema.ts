import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  userId: Types.ObjectId;

  @Prop()
  displayName: string;

  @Prop()
  image: string;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ type: [String] })
  interests: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
