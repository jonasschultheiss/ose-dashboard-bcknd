import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;
}
