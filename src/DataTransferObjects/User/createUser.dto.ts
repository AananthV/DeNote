//@ts-nocheck
import { IsString, IsEmail, MinLength, IsMobilePhone } from 'class-validator';

class CreateUserDto {

  @IsEmail()
  public email: string;
  
  @IsString()
  public username: string;
  
  @IsString()
  @MinLength(8)
  public password: string;

  @IsString()
  @MinLength(8)
  public confirmPassword: string;

  @IsMobilePhone()
  public mobileNumber: string;

}

export default CreateUserDto;