import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Perbaikan AC Gedung A',
    description: 'Judul task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Melakukan pengecekan dan perbaikan AC lantai 2',
    description: 'Deskripsi detail task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'High',
    description: 'Prioritas task',
  })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({
    example: '2025-02-01',
    description: 'Deadline penyelesaian task (ISO format)',
  })
  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @ApiPropertyOptional({
    example: 40,
    description: 'Progress task dalam persen (0 - 100)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @ApiPropertyOptional({
    example: 'Pending',
    description: 'Status task',
  })
  @IsString()
  @IsOptional()
  status?: string;
}
