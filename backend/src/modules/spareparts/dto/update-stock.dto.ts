import { IsNumber } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  qty: number; 
}