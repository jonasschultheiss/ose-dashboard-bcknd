import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly client_id: string;

  @IsString()
  @IsNotEmpty()
  readonly client_secret: string;
}
