import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsNotEmpty()
  readonly location: string;
}
