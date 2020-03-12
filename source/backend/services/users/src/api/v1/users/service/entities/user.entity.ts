import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';

@Entity('user')
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

  // @OneToOne(type => ProfileEntity)
  // @JoinColumn()
  // profile: ProfileEntity;

}
