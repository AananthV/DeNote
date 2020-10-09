//@ts-nocheck
import { IsString, IsEmail, MinLength } from "class-validator";

class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;
}

export default LoginUserDto;
