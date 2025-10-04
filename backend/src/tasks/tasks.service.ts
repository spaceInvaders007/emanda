import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    if (createTaskDto.parentId) {
      task.parent =
        (await this.tasksRepo.findOneBy({ id: createTaskDto.parentId })) ??
        undefined;
    }
    return this.tasksRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepo.find({ relations: ['subtasks', 'parent'] });
  }

  async findSubtasks(parentId: number): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { parent: { id: parentId } },
      relations: ['subtasks', 'parent'],
    });
  }
}
