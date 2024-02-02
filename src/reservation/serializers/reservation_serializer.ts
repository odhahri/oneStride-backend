import { Expose } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class ReservationDTO {
  @Expose({ name: "reservation_userId" })
  @IsInt()
  userId: number | undefined;

  @Expose({ name: "reservation_programId" })
  @IsOptional()
  @IsInt()
  programId: number | undefined;

  @Expose({ name: "reservation_tripId" })
  @IsOptional()
  @IsInt()
  tripId: number | undefined;
}
