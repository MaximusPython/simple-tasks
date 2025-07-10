import { IsNumber, IsString } from 'class-validator';

export class ApiCreatedDto {
  @IsString({
    message: 'не строка',
  })
  name: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;
}

export type TApiUpdateDto = Partial<ApiCreatedDto>;
