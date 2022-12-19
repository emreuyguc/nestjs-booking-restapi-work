import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {BookingEntity} from "../../../booking/data/entities/booking.entity";

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryColumn()
  @OneToMany(type => BookingEntity,booking => booking.id)
  @JoinColumn({name:'id',referencedColumnName:'user_id'})
  id?:number;

  @ApiProperty()
  @Expose()
  @Column()
  first_name:string;

  @ApiProperty()
  @Expose()
  @Column()
  last_name:string;

  @ApiProperty()
  @Expose()
  @Column()
  full_name?:string;

  @ApiProperty()
  @Expose()
  @Column()
  job_title?:string;

  @ApiProperty()
  @Expose()
  @Column()
  job_type?:string;

  @ApiProperty()
  @Expose()
  @Column()
  phone?:string;

  @ApiProperty()
  @Expose()
  @Column()
  email?:string;

  @ApiProperty()
  @Expose()
  @Column()
  image?:string;

  @ApiProperty()
  @Expose()
  @Column()
  country?:string;

  @ApiProperty()
  @Expose()
  @Column()
  city?:string;

  @ApiProperty()
  @Column({default:0})
  onboarding_completion?:number;
}