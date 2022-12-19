import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {  Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ApartmentEntity } from "../../../apartment/data/entities/apartment-entity";
import  * as dayjs from "dayjs";
import {UserEntity} from "../../../user/data/entities/user.entity";

@Entity('bookings')
export class BookingEntity {
  @Expose({toClassOnly:true})
  @ApiProperty()
  @PrimaryColumn()
  id?:number;


  @ApiProperty()
  @ManyToOne(type => UserEntity,object => object.id,)
  @JoinColumn({name:'user_id',referencedColumnName:'id',})
  user:UserEntity;

  @ApiProperty()
  @ManyToOne(type => ApartmentEntity,object => object.id,)
  @JoinColumn({name:'apartment_id',referencedColumnName:'id',})
  apartment:ApartmentEntity;

  @Expose()
  @ApiProperty()
  @Column()
  apartment_id:number;

  @Expose()
  @ApiProperty()
  @Column()
  user_id:number;

  @Expose()
  @ApiProperty()
  @Column()
  starts_at:string;

  @Expose()
  @ApiProperty()
  @Column()
  booked_for:number;

  @ApiProperty()
  @Column()
  booked_at:string;

  @Expose({toClassOnly:true})
  @ApiProperty({readOnly:true})
  ends_at: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  setComputed(){
    this.ends_at = dayjs(this.starts_at ?? 0,{utc:true}).add(this.booked_for ?? 0,'day').toISOString()
  }

  @Expose()
  @ApiProperty()
  @Column()
  confirmed:number
}