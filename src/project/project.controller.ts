import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    createProjectDto.createdBy = req.user.id;
    createProjectDto.updatedBy = req.user.id;

    return this.projectService.create(createProjectDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    updateProjectDto.updatedBy = req.user.id;

    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
