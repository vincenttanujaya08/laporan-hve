import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateRepairDto {
  @IsString()
  @IsNotEmpty()
  equipment: string; 

  @IsString()
  @IsNotEmpty()
  issue: string; 

  @IsString()
  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  priority: string; 

  @IsString()
  @IsOptional()
  @IsIn(['Pending', 'In Progress', 'Completed'])
  status?: string; 

  @IsString()
  @IsOptional()
  technician?: string; 

  @IsString()
  @IsOptional()
  notes?: string; 
}