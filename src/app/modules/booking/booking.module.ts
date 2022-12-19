import {BookingController} from "./controllers/booking.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookingEntity} from "./data/entities/booking.entity";
import {IsExistsBookingValidator} from "./data/validators/is-exists-booking.validator";
import {Module} from "@nestjs/common";
import {BookingService} from "./services/booking.service";


@Module({
  imports:[
    TypeOrmModule.forFeature([
      BookingEntity,
    ])
  ],
  controllers: [
    BookingController
  ],
  providers: [
    IsExistsBookingValidator,
    BookingService
  ],
})
export class BookingModule {}
