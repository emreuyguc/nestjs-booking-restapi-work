import {ApartmentEntity} from "./data/entities/apartment-entity";
import {ApartmentController} from "./controllers/apartment.controller";
import {IsExistsApartmentValidator} from "./data/validators/is-exists-apartment.validator";
import {ApartmentService} from "./services/apartment.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports:[
    TypeOrmModule.forFeature([
      ApartmentEntity,
    ])
  ],
  controllers: [
    ApartmentController
  ],
  providers: [
    IsExistsApartmentValidator,
    ApartmentService
  ],
})
export class ApartmentModule {}
