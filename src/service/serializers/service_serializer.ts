import { Expose } from "class-transformer";
import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class ServiceDTO {
  @Expose({ name: "service_label" })
  @IsString()
  label: string | undefined;

  @Expose({ name: "service_description" })
  @IsString()
  description: string | undefined;

  @Expose({ name: "service_price" })
  @IsNumber()
  price: number | undefined;

  @Expose({ name: "service_inclusionType" })
  @IsBoolean()
  inclusionType: boolean | undefined;

  @Expose({ name: "service_townId" })
  @IsInt()
  townId: number | undefined;
}
