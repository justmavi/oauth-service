import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Index()
  public userId: number;

  @Column({ nullable: false })
  public token: string;

  @Column({ nullable: false })
  public deviceId: string;

  @Column()
  public deviceName: string;

  @Column()
  public userAgent: string;

  @CreateDateColumn()
  public firstLoginDate: Date;

  @Column('timestamp without time zone')
  public lastLoginDate: Date;
}
