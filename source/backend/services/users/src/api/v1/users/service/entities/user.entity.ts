import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { ProfileEntity } from 'src/api/v1/profiles/service/entities/profile.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly lastUpdateAt: Date;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  avatar: string;

  @OneToOne(type => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

}
