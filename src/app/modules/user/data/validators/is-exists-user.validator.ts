import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import {UserService} from "../../services/user.service";

@ValidatorConstraint({ name: 'IsExistsUser', async: true })
@Injectable()
export class IsExistsUserValidator implements ValidatorConstraintInterface {
  constructor( private readonly userService:UserService) {}

  async validate(value: number) {
    try {
      return (await this.userService.getFromId(value)) !== null ;
    } catch (e) {
      return false;
    }

  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}