import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

// At least 1 lowercase, 1 uppercase, 1 digit and 1 special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character',
  })
  password: string;
}
