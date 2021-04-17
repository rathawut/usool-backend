import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
