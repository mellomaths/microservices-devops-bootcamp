import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('experiences')
export class ExperienceEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(type => ProfileEntity, { cascade: true })
  profile: ProfileEntity;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  company: string;

  @Column('text')
  website: string;

  @Column('date')
  from: Date;

  @Column('date')
  to: Date;

  @Column('boolean')
  isCurrent: boolean;

}
