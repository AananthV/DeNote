//@ts-nocheck
import { IsEmail } from "class-validator";

class ForgotPasswordDto {
  @IsEmail()
  public email: string;
}

export default ForgotPasswordDto;
