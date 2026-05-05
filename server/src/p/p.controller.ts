import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from "@nestjs/common";
import { PService } from "./p.service";
import { CreatePDto } from "./dto/create-p.dto";
// import { PPipe } from "./dto/create-p.dto";
@Controller("p")
export class PController {
  constructor(private readonly pService: PService) {}

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(typeof id); // string
    return this.pService.findOne(+id);
  }

  // @Post("create")
  // create(@Body(PPipe) createPDto: CreatePDto) {
  //   console.log(createPDto);
  //   return this.pService.create(createPDto);
  // }
  @Post("create")
  create(@Body() createDto: CreatePDto) {
    console.log(createDto);
    return true;
  }
}
