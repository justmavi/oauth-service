import { IsInt } from 'class-validator';

export class UnauthorizeDTO {
  @IsInt()
  public tokenId: number;
}
