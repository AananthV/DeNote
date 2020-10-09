//@ts-nocheck
import { IsString, IsEmail } from "class-validator";

class VerifyTokenDto {
  @IsEmail()
  public email: string;

  @IsString()
  public code: string;
}

export default VerifyTokenDto;
