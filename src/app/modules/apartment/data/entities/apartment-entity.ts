import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookingEntity } from "../../../booking/data/entities/booking.entity";
import { Expose } from "class-transformer";

@Entity('appartments')
export class ApartmentEntity {
  @ApiProperty()
  @PrimaryColumn()
  @OneToMany(type => BookingEntity,booking => booking.apartment_id)
  @JoinColumn({name:'id',referencedColumnName:'apartment_id'})
  id?:number;

  @Expose()
  @ApiProperty()
  @Column()
  name:string;

  @Expose()
  @ApiProperty()
  @Column()
  image:string

  @Expose()
  @ApiProperty()
  @Column()
  country:string;

  @Expose()
  @ApiProperty()
  @Column()
  city:string;

  @Expose()
  @ApiProperty()
  @Column()
  zip_code:string;

  @Expose()
  @ApiProperty()
  @Column()
  address:string;

  @Expose()
  @ApiProperty()
  @Column()
  address2:string;

  @Expose()
  @ApiProperty()
  @Column()
  latitude:number;

  @Expose()
  @ApiProperty()
  @Column()
  longitude:number;

  @Expose()
  @ApiProperty()
  @Column()
  direction:string;

  @ApiProperty()
  @Column()
  booked:boolean;
}