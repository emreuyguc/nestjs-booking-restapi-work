import {ApiTags} from "@nestjs/swagger";
import {Controller, UsePipes, ValidationPipe} from "@nestjs/common";
import {ApartmentService} from "../services/apartment.service";

@ApiTags('apartment')
@Controller("apartment")
@UsePipes(new ValidationPipe({ transform: true }))
export class ApartmentController {
  constructor(private readonly apartmentService:ApartmentService) { }
}
