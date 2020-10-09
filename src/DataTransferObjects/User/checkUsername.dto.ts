//@ts-nocheck
import { IsString } from "class-validator";

class CheckUsernameDto {
  @IsString()
  public username: string;
}

export default CheckUsernameDto;
