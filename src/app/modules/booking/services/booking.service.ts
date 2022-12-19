import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import {  plainToClass, plainToClassFromExist } from "class-transformer";
import { InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import { BookingEntity } from "../data/entities/booking.entity";
import { DeleteBookingResponseDto } from "../data/dtos/delete-booking-response.dto";
import { Between, ILike, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";
import { NewBookingRequestDto } from "../data/dtos/new-booking/new-booking-request.dto";
import { UpdateBookingRequestDto } from "../data/dtos/update-booking/update-booking-request.dto";
import { UpdateBookingResponseDto } from "../data/dtos/update-booking/update-booking-response.dto";
import { NewBookingResponseDto } from "../data/dtos/new-booking/new-booking-response.dto";
import {
  ListBookingPaginatedResult,
  ListBookingResponseDto
} from "../data/dtos/list-booking/list-booking-response.dto";
import * as shvl from "shvl";


@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingEntityRepository: Repository<BookingEntity>
  ) {
  }

  async getLastId(): Promise<number> {
    try {
      const lastBooking = await this.bookingEntityRepository.createQueryBuilder()
        .where("id = (select max(id) from bookings)").getOne();
      return lastBooking ? lastBooking.id : 0;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Booking LastId cant find");
    }
  }

  async getFromId(id_booking: number): Promise<BookingEntity> {
    try {
      return await this.bookingEntityRepository.findOne({
          where: { id: id_booking },
          relations: ["user", "apartment"]
          //todo metoda parametre eklenebilir ...params
        }
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Booking find failed!");
    }
  }

  async newBooking(newBooking: NewBookingRequestDto): Promise<NewBookingResponseDto> {
    const lastBookingId = await this.getLastId();

    const booking = plainToClass(BookingEntity, newBooking, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
      exposeUnsetFields: true
    });

    booking.confirmed = 0;
    booking.starts_at = dayjs(newBooking.starts_at, { utc: true }).toISOString();
    booking.booked_at = dayjs(new Date(), { utc: true }).toISOString();

    //todo decoratora alınabilirmi?
    booking.id = lastBookingId + 1;
    try {
      return await this.bookingEntityRepository.save(booking);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Booking not saved!");
    }
  }

  async updateBooking(updatedBooking: UpdateBookingRequestDto): Promise<UpdateBookingResponseDto> {
    const booking = plainToClassFromExist(
      await this.bookingEntityRepository.findOneBy({
        id: updatedBooking.id
      }),
      updatedBooking,
      {
        excludeExtraneousValues: true,
        exposeDefaultValues: true
      });

    if (updatedBooking.starts_at) {
      booking.starts_at = dayjs(updatedBooking.starts_at, { utc: true }).toISOString();
    }

    try {
      return await this.bookingEntityRepository.save(booking);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Booking not saved!");
    }
  }

  async deleteBooking(id_booking: number): Promise<DeleteBookingResponseDto> {
    const booking = await this.getFromId(id_booking);
    if (booking.confirmed != 0) {
      throw new BadRequestException("This booking has been confirmed. Confirmed records cannot be deleted !");
    }
    return await this.bookingEntityRepository.remove(booking);
  }

  async listBooking(rawQuery): Promise<ListBookingPaginatedResult> {
    type IFilterQuery = {
      user?: {
        first_name?: string,
        last_name?: string
      };

      apartment?: {
        name?: string
      };

      starts_at?: string;
      ends_at?: string;
      confirmed?: string | number | boolean;
      page:number;
    }

    const filter_query: IFilterQuery = {
      user: { first_name: "", last_name: "" },
      apartment: { name: "" },
      starts_at: "",
      ends_at: "",
      confirmed: -1,
      page : 1
    };

    Object.entries(rawQuery).forEach(([key, value], index) => {
      shvl.set(filter_query, key, value, {});
    });

    if(filter_query.page < 1){
      throw new BadRequestException('Page value cannot be negative or zero');
    }

    const results = await this.bookingEntityRepository.findAndCount({
      where: {
        user: [
          ...(filter_query.user.first_name) && [{ first_name: ILike("%" + filter_query.user.first_name + "%") }],
          ...(filter_query.user.last_name) && [{ last_name: ILike("%" + filter_query.user.last_name + "%") }]
        ],
        apartment: {
          ...(filter_query.apartment.name) && { name: ILike("%" + filter_query.apartment.name + "%") }
        },
        ...(!filter_query.starts_at && filter_query.ends_at) && { starts_at: LessThanOrEqual(filter_query.ends_at) },
        ...(filter_query.starts_at && filter_query.ends_at) && { starts_at: Between(filter_query.starts_at, filter_query.ends_at) },
        ...(filter_query.starts_at && !filter_query.ends_at) && { starts_at: MoreThanOrEqual(filter_query.starts_at) },
        ...(filter_query.confirmed !== -1 && { confirmed: Number((filter_query.confirmed === "true" || filter_query.confirmed === "1" || filter_query.confirmed === 1)) })
      },
      relations: ["user", "apartment"],
      select: {
        user: {
          first_name: true,
          last_name: true,
          email: true,
          phone: true
        },
        apartment: {
          name: true,
          address: true,
          zip_code: true,
          city: true,
          country: true
        },
        id: true,
        starts_at: true,
        booked_for: true,
        confirmed: true
      },
      take : 10,
      skip : (filter_query.page-1)*10,
      order : {
        id:'ASC'
      }
    });


    return {
      data : plainToClass(ListBookingResponseDto, results[0], {
        exposeUnsetFields: true,
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
        enableImplicitConversion: true
      }),
      total : results[1],
      dataCount : results[0].length
    };
  }
}
