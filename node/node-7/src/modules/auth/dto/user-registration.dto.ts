import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  public readonly lastName?: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsOptional()
  readonly country?: string;

  @IsString()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsDate()
  @IsOptional()
  readonly birthday?: Date;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  readonly phoneNumber?: string;
}
