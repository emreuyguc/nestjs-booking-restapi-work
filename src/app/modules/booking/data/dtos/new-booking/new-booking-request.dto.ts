import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsExistsApartmentValidator } from "../../../../apartment/data/validators/is-exists-apartment.validator";
import {IsExistsUserValidator} from "../../../../user/data/validators/is-exists-user.validator";

export class NewBookingRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Validate(IsExistsUserValidator)
  user_id:number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Validate(IsExistsApartmentValidator)
  apartment_id:number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  starts_at:string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  booked_for:number;
}