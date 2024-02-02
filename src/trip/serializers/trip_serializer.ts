import { Expose } from "class-transformer";
import { IsString, IsInt, IsOptional, IsDate, IsNumber } from "class-validator";

export class TripDTO {
  @Expose({ name: "trip_destTownId" })
  @IsInt()
  destTownId: number | undefined;

  @Expose({ name: "trip_departTownId" })
  @IsInt()
  departTownId: number | undefined;

  @Expose({ name: "trip_label" })
  @IsString()
  label: string | undefined;

  @Expose({ name: "trip_description" })
  @IsString()
  description: string | undefined;

  @Expose({ name: "trip_departureDate" })
  @IsString()
  departureDate: string | undefined;

  @Expose({ name: "trip_comingDate" })
  @IsOptional()
  @IsString()
  comingDate?: string | undefined;

  @Expose({ name: "trip_personPrice" })
  @IsNumber()
  personPrice: number | undefined;

  @Expose({ name: "trip_images" })
  @IsOptional()
  @IsString()
  images?: string | undefined;
}
