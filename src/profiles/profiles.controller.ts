import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('createProfile')
  createProfile(@Req() req, @Body() dto: CreateProfileDto) {
    return this.profilesService.createProfile(req.user.userId, dto);
  }

  @Get('getProfile')
  getProfile(@Req() req) {
    return this.profilesService.getProfile(req.user.userId);
  }

  @Put('updateProfile')
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profilesService.updateProfile(req.user.userId, dto);
  }
}
