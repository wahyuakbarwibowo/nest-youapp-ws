import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile } from './profiles.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { getZodiac } from './profile.utils';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
  ) {}

  async createProfile(userId: string, dto: CreateProfileDto) {
    const existing = await this.profileModel.findOne({
      userId,
    });

    if (existing) {
      throw new BadRequestException('Profile already exists');
    }

    const birthday = new Date(dto.birthday);
    const zodiac = getZodiac(birthday);

    return this.profileModel.create({
      ...dto,
      userId: new Types.ObjectId(userId),
      birthday,
      horoscope: zodiac,
      zodiac,
    });
  }

  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.profileModel.findOne({ userId });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (dto.birthday) {
      const birthday = new Date(dto.birthday);
      profile.birthday = birthday;
      profile.zodiac = getZodiac(birthday);
      profile.horoscope = profile.zodiac;
    }

    Object.assign(profile, dto);
    return profile.save();
  }
}
