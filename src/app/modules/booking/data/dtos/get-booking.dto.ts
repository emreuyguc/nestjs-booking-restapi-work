import { IsNotEmpty, IsNumber, IsNumberString, IsString, Validate } from "class-validator";
import { IsExistsBookingValidator } from "../validators/is-exists-booking.validator";
import { ApiProperty } from "@nestjs/swagger";


export class GetBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsExistsBookingValidator)
  id_booking:number;
}