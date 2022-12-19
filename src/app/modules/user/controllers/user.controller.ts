import {ApiTags} from "@nestjs/swagger";
import {Controller, UsePipes, ValidationPipe} from "@nestjs/common";
import {UserService} from "../services/user.service";

@ApiTags('user')
@Controller("user")
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userService:UserService) { }
}
