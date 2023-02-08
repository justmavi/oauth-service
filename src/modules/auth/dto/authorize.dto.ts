import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AuthrorizeDTO {
  @IsUUID()
  public token: string;

  @IsString()
  @IsNotEmpty()
  public deviceId: string;
}
