import { Controller, Get, Post, Body, Res, Session } from "@nestjs/common";
import { UserService } from "./user.service";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";
import svgCaptcha from "svg-captcha";
@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("captcha")
  getCaptcha(@Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: "0o1i",
      noise: 2,
      width: 100,
      height: 34,
    });
    session.code = captcha.text;
    res.type("image/svg+xml");
    return res.send(captcha.data);
  }

  @Post("/create")
  createUser(@Body() body, @Session() session) {
    console.log(body, session.code);
    return {
      code: 200,
      message: "用户创建成功",
    };
  }
}
