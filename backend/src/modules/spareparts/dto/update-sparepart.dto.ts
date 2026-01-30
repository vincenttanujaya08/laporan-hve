import { PartialType } from '@nestjs/swagger';
import { CreateSparepartDto } from './create-sparepart.dto';

export class UpdateSparepartDto extends PartialType(CreateSparepartDto) {}
