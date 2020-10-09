//@ts-nocheck
import { IsString, MinLength } from "class-validator";

class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  public password: string;

  @IsString()
  @MinLength(8)
  public confirmPassword: string;
}

export default ResetPasswordDto;
