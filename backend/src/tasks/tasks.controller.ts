import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id/subtasks')
  findSubtasks(@Param('id') id: string) {
    const parentId = parseInt(id, 10);
    if (isNaN(parentId)) {
      throw new BadRequestException('Invalid task ID');
    }
    return this.tasksService.findSubtasks(parentId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      throw new BadRequestException('Invalid task ID');
    }
    return this.tasksService.remove(taskId);
  }

  @Delete()
  removeAll() {
    return this.tasksService.removeAll();
  }
}
