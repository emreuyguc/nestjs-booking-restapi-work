import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional, Max,
  Min,
  Validate
} from "class-validator";
import { Expose } from "class-transformer";
import { IsExistsApartmentValidator } from "../../../../apartment/data/validators/is-exists-apartment.validator";
import { IsExistsBookingValidator } from "../../validators/is-exists-booking.validator";
import {IsExistsUserValidator} from "../../../../user/data/validators/is-exists-user.validator";


export class UpdateBookingRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Validate(IsExistsBookingValidator)
  id: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({required:false})
  @Validate(IsExistsUserValidator)
  user_id?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({required:false})
  @Validate(IsExistsApartmentValidator)
  apartment_id?: number;

  @Expose()
  @IsDateString()
  @IsOptional()
  @ApiProperty({required:false})
  starts_at?: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  @ApiProperty({required:false})
  booked_for?: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  @ApiProperty({required:false})
  confirmed?:number;
}