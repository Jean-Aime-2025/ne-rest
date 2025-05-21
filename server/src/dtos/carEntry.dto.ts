import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarEntryDto {
  @IsNotEmpty() @IsString()
  plateNumber: string;

  @IsNotEmpty() @IsString()
  parkingCode: string;
}
