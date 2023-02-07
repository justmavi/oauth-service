import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  public deviceId: string;

  @IsString()
  @IsNotEmpty()
  public deviceName: string;

  @IsString()
  @IsNotEmpty()
  public userAgent: string;
}
