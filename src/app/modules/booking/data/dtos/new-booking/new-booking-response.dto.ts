import { OmitType } from "@nestjs/swagger";
import { BookingEntity } from "../../entities/booking.entity";

export class NewBookingResponseDto extends OmitType(BookingEntity, ["user", "apartment"]) {}