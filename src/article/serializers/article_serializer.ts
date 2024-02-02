import { Expose } from "class-transformer";
import { IsString, IsInt, IsOptional } from "class-validator";

export class ArticleDTO {
  @Expose({ name: "article_label" })
  @IsString()
  label: string | undefined;

  @Expose({ name: "article_description" })
  @IsString()
  description: string | undefined;

  @Expose({ name: "article_images" })
  @IsOptional()
  @IsString()
  images?: string | undefined;

  @Expose({ name: "article_userId" })
  @IsInt()
  userId: number | undefined;
}
