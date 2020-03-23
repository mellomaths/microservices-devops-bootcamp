import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('scms')
export class ScmEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(type => ProfileEntity, { cascade: true })
  profile: ProfileEntity;

  @Column('text')
  serviceName: string;

  @Column('text')
  username: string;

  isGithub(): boolean {
    return this.serviceName === 'GITHUB';
  }

}
