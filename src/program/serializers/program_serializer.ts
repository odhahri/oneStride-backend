import { Expose } from "class-transformer";
import { IsString, IsNumber, IsOptional } from "class-validator";

export class ProgramDTO {
  @Expose({ name: "program_label" })
  @IsString()
  label: string | undefined;

  @Expose({ name: "program_description" })
  @IsString()
  description: string | undefined;

  @Expose({ name: "program_personPrice" })
  @IsNumber()
  personPrice: number | undefined;

  @Expose({ name: "program_images" })
  @IsOptional()
  @IsString()
  images?: string | undefined;
}
