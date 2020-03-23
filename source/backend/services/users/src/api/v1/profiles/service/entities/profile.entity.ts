import { Entity, Column, OneToMany, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { SkillEntity } from './skill.entity';
import { ScmEntity } from './scm.entity';
import { ExperienceEntity } from './experience.entity';
import { AddressEntity } from './address.entity';

@Entity('profiles')
export class ProfileEntity {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly lastUpdateAt: Date;

  @Column('text')
  name: string;

  @Column('text')
  socialName: string;

  @Column('text')
  avatar: string;

  @Column('text')
  website: string;

  @Column('text')
  bio: string;

  @OneToOne(type => AddressEntity)
  address: AddressEntity;

  @OneToMany(type => SkillEntity, skill => skill.profile)
  @JoinColumn()
  skills: SkillEntity[];

  @OneToMany(type => ScmEntity, scm => scm.profile)
  @JoinColumn()
  scms: ScmEntity[];

  @OneToMany(type => ExperienceEntity, experience => experience.profile)
  @JoinColumn()
  experiences: ExperienceEntity[];

  // @OneToMany(type => EducationEntity, education => education.profile)
  // @JoinColumn()
  // educations: EducationEntity[];

  // @OneToMany(type => SocialMediaEntity, socialmedia => socialmedia.profile)
  // @JoinColumn()
  // socials: SocialMediaEntity[];

}
