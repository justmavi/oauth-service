import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthDTO {
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
