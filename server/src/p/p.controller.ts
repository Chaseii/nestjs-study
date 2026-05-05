import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  SetMetadata,
} from "@nestjs/common";
import { PService } from "./p.service";
import { CreatePDto } from "./dto/create-p.dto";
import { RoleGuard } from "src/role/role.guard";
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
  @SetMetadata("role", ["admin"])
  create(@Body() createDto: CreatePDto) {
    console.log(createDto);
    return true;
  }
}
