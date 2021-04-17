import { ApiProperty } from '@nestjs/swagger';

export class AuthPasswordDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
