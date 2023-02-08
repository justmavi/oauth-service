import { OAuthProvider } from 'src/enums/oauth-provider.enum';
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

  @Column('bigint')
  public userId: number;

  @Column()
  public provider: OAuthProvider;

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

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  public lastLoginDate: Date;
}
