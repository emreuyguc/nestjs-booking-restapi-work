import { BadRequestException, Injectable } from "@nestjs/common";
import {  InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApartmentEntity } from "../data/entities/apartment-entity";

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(ApartmentEntity)
    private apartmentEntityRepository: Repository<ApartmentEntity>
  ) {
  }

  async getFromId(id_apartment: number): Promise<ApartmentEntity> {
    try {
      return await this.apartmentEntityRepository.findOne({
          where: {
            id: id_apartment
          }
        }
      );
    } catch (e) {
      console.log(e)
      throw new BadRequestException('Apartment cant find');
    }
  }

}
