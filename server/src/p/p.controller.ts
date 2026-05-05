import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { PService } from "./p.service";
import { CreatePDto } from "./dto/create-p.dto";
import { RoleGuard } from "src/role/role.guard";
import { Role } from "../role/role.decorator";
@Controller("p")
@UseGuards(RoleGuard)
export class PController {
  constructor(private readonly pService: PService) {}

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(typeof id); // string
    return this.pService.findOne(+id);
  }

  @Post("create")
  @Role("admin", "sub")
  create(@Body() createDto: CreatePDto) {
    console.log(createDto);
    return true;
  }
}
