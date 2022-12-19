import { BadRequestException, Injectable } from "@nestjs/common";
import {  InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../data/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>
  ) {
  }

  async getFromId(id_user: number): Promise<UserEntity> {
    try {
      return await this.userEntityRepository.findOne({
          where: {
            id: id_user
          }
        }
      );
    } catch (e) {
      throw new BadRequestException('User cant find');
    }
  }

}
