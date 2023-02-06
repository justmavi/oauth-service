import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column({ unique: true, nullable: false })
  public token: string;

  @Column({ nullable: false })
  public deviceId: string;

  @CreateDateColumn()
  public firstLoginDate: Date;

  @Column('timestamp with time zone')
  public lastLoginDate: Date;
}
