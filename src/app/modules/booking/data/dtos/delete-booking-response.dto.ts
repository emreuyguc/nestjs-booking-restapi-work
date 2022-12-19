import { BookingEntity } from "../entities/booking.entity";
import { OmitType } from "@nestjs/swagger";


export class DeleteBookingResponseDto extends OmitType(BookingEntity,['id'] as const){}