import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRepairDto {
  @ApiProperty({
    example: 'AC Ruang Server',
    description: 'Nama atau identitas equipment yang diperbaiki',
  })
  @IsString()
  @IsNotEmpty()
  equipment: string; 

  @ApiProperty({
    example: 'AC tidak dingin',
    description: 'Deskripsi masalah pada equipment',
  })
  @IsString()
  @IsNotEmpty()
  issue: string; 

  @ApiProperty({
    example: 'High',
    description: 'Tingkat prioritas perbaikan',
    enum: ['Low', 'Medium', 'High'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  priority: string; 

  @ApiPropertyOptional({
    example: 'Pending',
    description: 'Status perbaikan',
    enum: ['Pending', 'In Progress', 'Completed'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['Pending', 'In Progress', 'Completed'])
  status?: string; 

  @ApiPropertyOptional({
    example: 'Budi Santoso',
    description: 'Nama teknisi yang menangani perbaikan',
  })
  @IsString()
  @IsOptional()
  technician?: string; 

  @ApiPropertyOptional({
    example: 'Menunggu spare part',
    description: 'Catatan tambahan',
  })
  @IsString()
  @IsOptional()
  notes?: string; 
}
