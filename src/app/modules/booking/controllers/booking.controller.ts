import { Body, Controller, Delete, Get, Param, Post, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { NewBookingResponseDto } from "../data/dtos/new-booking/new-booking-response.dto";
import { BookingService } from "../services/booking.service";
import { GetBookingDto } from "../data/dtos/get-booking.dto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateBookingResponseDto } from "../data/dtos/update-booking/update-booking-response.dto";
import { BookingEntity } from "../data/entities/booking.entity";
import { DeleteBookingResponseDto } from "../data/dtos/delete-booking-response.dto";
import { NewBookingRequestDto } from "../data/dtos/new-booking/new-booking-request.dto";
import { UpdateBookingRequestDto } from "../data/dtos/update-booking/update-booking-request.dto";
import {
  ListBookingPaginatedResult
} from "../data/dtos/list-booking/list-booking-response.dto";

@ApiTags('booking')
@Controller("booking")
@UsePipes(new ValidationPipe({ transform: true }))
export class BookingController {
  constructor(private readonly bookingService:BookingService) { }


  @Get('/:id_booking')
  @ApiResponse({type:BookingEntity})
  async getBooking(@Param() getBookingDto:GetBookingDto):Promise<BookingEntity>{
    return await this.bookingService.getFromId(getBookingDto.id_booking);
  }

  @Post('/new')
  @ApiResponse({type:NewBookingResponseDto})
  async newBooking(@Body() newBooking:NewBookingRequestDto):Promise<NewBookingResponseDto>{
    return await this.bookingService.newBooking(newBooking);
  }

  @Post('/update')
  @ApiResponse({type:UpdateBookingResponseDto})
  async updateBooking(@Body() updatedBooking:UpdateBookingRequestDto):Promise<UpdateBookingResponseDto>{
    return await this.bookingService.updateBooking(updatedBooking);
  }

  @Delete('/:id_booking')
  @ApiResponse({type:DeleteBookingResponseDto})
  async deleteBooking(@Param() getBookingDto:GetBookingDto):Promise<DeleteBookingResponseDto>{
    return await this.bookingService.deleteBooking(getBookingDto.id_booking);
  }

  @Get('/list')
  @ApiQuery({name:'user.first_name',required:false,type:'string'})
  @ApiQuery({name:'user.last_name',required:false,type:'string'})
  @ApiQuery({name:'apartment.name',required:false,type:'string'})
  @ApiQuery({name:'starts_at',required:false,type:'datetime'})
  @ApiQuery({name:'ends_at',required:false,type:'datetime'})
  @ApiQuery({name:'confirmed',required:false,type:'boolean'})
  @ApiQuery({name:'page',required:false,type:'number'})
  @ApiResponse({type:ListBookingPaginatedResult,isArray:true})
  async listBookings(@Req() req) : Promise<ListBookingPaginatedResult>{
    return this.bookingService.listBooking(req.query);
  }

}
