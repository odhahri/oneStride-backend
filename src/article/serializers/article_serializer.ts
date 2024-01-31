import { Expose } from "class-transformer";
import { IsString, IsInt, IsOptional } from "class-validator";

export class ArticleDTO {
  @Expose()
  @IsString()
  label: string | undefined;

  @Expose()
  @IsString()
  description: string | undefined;

  @Expose()
  @IsString()
  images?: string;

  @Expose()
  @IsInt()
  userId: number | undefined;
}
