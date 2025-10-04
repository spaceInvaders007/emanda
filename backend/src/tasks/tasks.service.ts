import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
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
    const tasks = await this.tasksRepo.find({ 
      where: { parent: IsNull() },
      relations: ['subtasks', 'parent'] 
    });
    
    // Recursively load all nested subtasks
    for (const task of tasks) {
      await this.loadSubtasksRecursively(task);
    }
    
    return tasks;
  }

  private async loadSubtasksRecursively(task: Task): Promise<void> {
    if (task.subtasks && task.subtasks.length > 0) {
      for (const subtask of task.subtasks) {
        const fullSubtask = await this.tasksRepo.findOne({
          where: { id: subtask.id },
          relations: ['subtasks', 'parent']
        });
        if (fullSubtask) {
          Object.assign(subtask, fullSubtask);
          await this.loadSubtasksRecursively(subtask);
        }
      }
    }
  }

  async findSubtasks(parentId: number): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { parent: { id: parentId } },
      relations: ['subtasks', 'parent'],
    });
  }
}
