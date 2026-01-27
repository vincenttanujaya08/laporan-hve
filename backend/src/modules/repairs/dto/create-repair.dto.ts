import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRepairDto {
  @IsString()
  @IsNotEmpty()
  equipment: string;

  @IsString()
  @IsNotEmpty()
  issue: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  technician?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}