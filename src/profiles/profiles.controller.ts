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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth('JWT-auth')
@Controller('api')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Create user profile' })
  @Post('createProfile')
  createProfile(@Req() req, @Body() dto: CreateProfileDto) {
    return this.profilesService.createProfile(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @Get('getProfile')
  getProfile(@Req() req) {
    return this.profilesService.getProfile(req.user.userId);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @Put('updateProfile')
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profilesService.updateProfile(req.user.userId, dto);
  }
}
