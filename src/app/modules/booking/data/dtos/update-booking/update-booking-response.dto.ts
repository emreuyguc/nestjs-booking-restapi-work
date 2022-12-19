import { OmitType } from "@nestjs/swagger";
import { BookingEntity } from "../../entities/booking.entity";

export class UpdateBookingResponseDto extends OmitType(BookingEntity, ["user", "apartment",t"ends_a"]) {
}