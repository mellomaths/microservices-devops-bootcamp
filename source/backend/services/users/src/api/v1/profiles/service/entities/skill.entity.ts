import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('skills')
export class SkillEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(type => ProfileEntity, { cascade: true })
  profile: ProfileEntity;

  @Column('text')
  name: string;

}
