import { TypeOrmModule } from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {UserController} from "./controllers/user.controller";
import {UserEntity} from "./data/entities/user.entity";
import {IsExistsUserValidator} from "./data/validators/is-exists-user.validator";
import {UserService} from "./services/user.service";


@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    IsExistsUserValidator,
    UserService
  ],
})
export class UserModule {}
