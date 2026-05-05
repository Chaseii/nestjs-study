import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreatePDto {
  @IsNotEmpty({
    message: "名称不能为空",
  })
  @IsString({
    message: "名称必须是字符串",
  })
  @Length(2, 10, {
    message: "名称是2-10个字符",
  })
  name: string | undefined;
  age: number | undefined;
}
