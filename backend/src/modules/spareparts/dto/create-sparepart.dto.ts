import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsDateString, IsIn } from 'class-validator';

export class CreateSparepartDto {
  @IsString()
  @IsNotEmpty()
  name: string; 

  @IsNumber()
  @Min(1)
  quantity: number; 

  @IsString()
  @IsNotEmpty()
  unit: string; 

  @IsString()
  @IsOptional()
  description?: string; 

  @IsString()
  @IsOptional()
  @IsIn(['Pending', 'Ordered', 'Arrived']) 
  status?: string; 

  @IsDateString()
  @IsOptional()
  orderDate?: string;

  @IsDateString()
  @IsOptional()
  arrivalDate?: string; 
}