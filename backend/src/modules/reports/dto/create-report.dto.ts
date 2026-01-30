import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    example: '2025-01-26',
    description: 'Tanggal laporan (ISO format)',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string; 

  @ApiProperty({
    example: '08:00',
    description: 'Waktu mulai kegiatan',
  })
  @IsString()
  @IsNotEmpty()
  startTime: string; 

  @ApiProperty({
    example: '16:00',
    description: 'Waktu selesai kegiatan',
  })
  @IsString()
  @IsNotEmpty()
  endTime: string; 

  @ApiProperty({
    example: 'Surabaya',
    description: 'Lokasi kegiatan',
  })
  @IsString()
  @IsNotEmpty()
  location: string; 

  @ApiProperty({
    example: 'Project ABC',
    description: 'Nama project',
  })
  @IsString()
  @IsNotEmpty()
  project: string; 

  @ApiProperty({
    example: 'Development Backend',
    description: 'Aktivitas yang dilakukan',
  })
  @IsString()
  @IsNotEmpty()
  activity: string; 

  @ApiPropertyOptional({
    example: 'Laptop, Router',
    description: 'Peralatan yang digunakan',
  })
  @IsString()
  @IsOptional()
  equipment?: string;

  @ApiProperty({
    example: 'Mengerjakan API laporan harian',
    description: 'Deskripsi detail kegiatan',
  })
  @IsString()
  @IsNotEmpty()
  description: string; 

  @ApiProperty({
    example: 'PENDING',
    description: 'Status laporan (PENDING / APPROVED / REJECTED)',
  })
  @IsString()
  @IsNotEmpty()
  status: string; 

  @ApiPropertyOptional({
    example: 'Perlu revisi jam kerja',
    description: 'Catatan tambahan',
  })
  @IsString()
  @IsOptional()
  notes?: string; 
}
