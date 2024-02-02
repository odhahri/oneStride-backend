import { Expose } from "class-transformer";
import { IsString, IsInt, IsDate, IsOptional } from "class-validator";

export class UserDTO {
  @Expose({ name: "user_fname" })
  @IsString()
  fname: string | undefined;

  @Expose({ name: "user_lname" })
  @IsString()
  lname: string | undefined;

  @Expose({ name: "user_gender" })
  @IsString()
  gender: string | undefined;

  @Expose({ name: "user_bdate" })
  @IsDate()
  bdate: Date | undefined;

  @Expose({ name: "user_phone" })
  @IsString()
  phone: string | undefined;

  @Expose({ name: "user_username" })
  @IsString()
  username: string | undefined;

  @Expose({ name: "user_image" })
  @IsOptional()
  @IsString()
  image?: string | undefined;

  @Expose({ name: "user_role" })
  @IsOptional()
  @IsString()
  role?: string | undefined;
}
