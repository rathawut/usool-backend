import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  createdBy: number;
  updatedBy: number;
}
