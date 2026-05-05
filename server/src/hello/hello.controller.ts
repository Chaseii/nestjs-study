import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HelloService } from "./hello.service";
import { CreateHelloDto } from "./dto/create-hello.dto";
import { UpdateHelloDto } from "./dto/update-hello.dto";

@Controller("hello")
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get("hello")
  findOne() {
    return "hello";
  }
}
