import { Expose } from "class-transformer";
import { IsString, IsInt, IsOptional } from "class-validator";

export class ReplyDTO {
  @Expose({ name: "reply_userId" })
  @IsInt()
  userId: number | undefined;

  @Expose({ name: "reply_content" })
  @IsString()
  content: string | undefined;

  @Expose({ name: "reply_reacts" })
  @IsOptional()
  @IsInt()
  reacts?: number | undefined;

  @Expose({ name: "reply_articleId" })
  @IsInt()
  articleId: number | undefined;
}
