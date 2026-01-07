import {
  IsString,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(['male', 'female'])
  gender: string;

  @IsDateString()
  birthday: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsArray()
  interests: string[];
}
