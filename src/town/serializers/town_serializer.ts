import { Expose } from "class-transformer";
import { IsString, IsArray } from "class-validator";

export class TownDTO {
  @Expose({ name: "town_townName" })
  @IsString()
  townName: string | undefined;

  @Expose({ name: "town_location" })
  @IsString()
  location: string | undefined;

  @Expose({ name: "town_images" })
  @IsArray()
  images: string[] | undefined;

  @Expose({ name: "town_description" })
  @IsString()
  description: string | undefined;
}
