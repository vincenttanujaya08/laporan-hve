import { IsString, IsNotEmpty, IsNumber, Min, Max, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProgressLogDto {
  @ApiProperty({ example: '2025-12-05', description: 'Tanggal kerja' })
  @IsDateString()
  @IsNotEmpty()
  date: string; 

  @ApiProperty({ example: 10, minimum: 1, maximum: 100 })
  @IsNumber()
  @Min(1) 
  @Max(100)
  progress: number;

  @ApiProperty({ example: 'Memperbaiki LCD', description: 'Deskripsi' })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({ example: 'uuid-task-disini' })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;
}

export class UpdateProgressLogDto extends PartialType(CreateProgressLogDto) {}