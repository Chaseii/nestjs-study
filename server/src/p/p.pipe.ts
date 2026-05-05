import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from "@nestjs/common";
import { CreatePDto } from "./dto/create-p.dto";
import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class PPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata || !metadata.metatype) {
      return value;
    }
    const DTO = plainToInstance(
      metadata.metatype as ClassConstructor<CreatePDto>,
      value,
    );
    const errors = await validate(DTO);
    console.log(errors);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
