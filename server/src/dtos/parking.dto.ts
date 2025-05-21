import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateParkingDto {
  @IsNotEmpty() @IsString()
  code: string;

  @IsNotEmpty() @IsString()
  name: string;

  @IsNotEmpty() @IsNumber()
  numberOfSpaces: number;

  @IsNotEmpty() @IsString()
  location: string;

  @IsNotEmpty() @IsNumber()
  chargePerHour: number;

  @IsOptional() @IsString()
  description?: string;
}
