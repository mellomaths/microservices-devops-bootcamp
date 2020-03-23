import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';

@Entity('addresses')
export class AddressEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('text')
  city: string;

  @Column('text')
  country: string;

  @OneToOne(type => AddressEntity)
  address: AddressEntity;

}
