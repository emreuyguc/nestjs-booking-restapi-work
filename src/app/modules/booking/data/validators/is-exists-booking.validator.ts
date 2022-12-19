import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { BookingService } from "../../services/booking.service";

@ValidatorConstraint({ name: 'IsExistsBooking', async: true })
@Injectable()
export class IsExistsBookingValidator implements ValidatorConstraintInterface {
  constructor( private readonly bookingService:BookingService) {}

  async validate(value: number) {

    try {
      return (await this.bookingService.getFromId(value)) !== null ;
    } catch (e) {
      return false;
    }

  }

  defaultMessage(args: ValidationArguments) {
    return `Booking doesn't exist`;
  }
}