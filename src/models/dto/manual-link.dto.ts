import { IsNotEmpty, IsString } from 'class-validator';

export class ManualLinkDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
