import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  displayName: string;

  @ApiProperty({
    example: 'https://cdn.app.com/avatar.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'male' })
  @IsEnum(['male', 'female'])
  gender: string;

  @ApiProperty({ example: '1995-05-20' })
  @IsDateString()
  birthday: string;

  @ApiProperty({ example: 175 })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 70 })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: ['Music', 'Sports'],
    type: [String],
  })
  @IsArray()
  interests: string[];
}
