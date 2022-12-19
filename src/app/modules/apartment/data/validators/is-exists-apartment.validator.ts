import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ApartmentService } from "../../services/apartment.service";

@ValidatorConstraint({ name: 'IsExistsApartment', async: true })
@Injectable()
export class IsExistsApartmentValidator implements ValidatorConstraintInterface {
  constructor( private readonly apartmentService:ApartmentService) {}

  async validate(value: number) {
    try {
      return (await this.apartmentService.getFromId(value)) !== null ;
    } catch (e) {
      return false;
    }

  }

  defaultMessage(args: ValidationArguments) {
    return `Apartment doesn't exist`;
  }
}