import { Module } from "@nestjs/common";
import { BookingModule } from "./modules/booking/booking.module";
import {ApartmentModule} from "./modules/apartment/apartment.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [
      UserModule,
      ApartmentModule,
    BookingModule
  ]
})
export class AppModule {
}
