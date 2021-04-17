export class CreateProjectDto {
  categoryId: number;
  name: string;
  description?: string;
  createdBy: number;
  updatedBy: number;
}
