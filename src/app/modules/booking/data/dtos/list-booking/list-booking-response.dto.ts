import { ApartmentEntity } from "../../../../apartment/data/entities/apartment-entity";
import { BookingEntity } from "../../entities/booking.entity";
import { ApiProperty, ApiResponse, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {UserEntity} from "../../../../user/data/entities/user.entity";


class ListBookingApartmentDetail extends PickType(ApartmentEntity, ["name","address","zip_code","city","country"]){}
class ListBookingUserDetail extends PickType(UserEntity, ["first_name" , "last_name" , "email" , "phone"]){}
class ListBookingBookingDetail extends PickType(BookingEntity, ["starts_at" ,"ends_at" ,"confirmed","id"]){}

export class ListBookingResponseDto extends ListBookingBookingDetail{
  @Expose()
  @ApiProperty({name:'apartment'})
  apartment : ListBookingApartmentDetail;

  @Expose()
  @ApiProperty({name:'user'})
  user : ListBookingUserDetail;
}


export class ListBookingPaginatedResult{
  data : ListBookingResponseDto[];
  dataCount :  number;
  total : number;
}
