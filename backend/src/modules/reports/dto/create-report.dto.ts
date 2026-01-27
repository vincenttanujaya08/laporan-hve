import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsDateString()
  @IsNotEmpty()
  date: string; 

  @IsString()
  @IsNotEmpty()
  startTime: string; 

  @IsString()
  @IsNotEmpty()
  endTime: string; 

  @IsString()
  @IsNotEmpty()
  location: string; 

  @IsString()
  @IsNotEmpty()
  project: string; 

  @IsString()
  @IsNotEmpty()
  activity: string; 

  @IsString()
  @IsOptional()
  equipment?: string;

  @IsString()
  @IsNotEmpty()
  description: string; 

  @IsString()
  @IsNotEmpty()
  status: string; 

  @IsString()
  @IsOptional()
  notes?: string; 
}