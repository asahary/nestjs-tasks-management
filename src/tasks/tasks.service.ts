import { Injectable, UseFilters, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){
    
    }

    async getTasks(
        filterDto: GetTasksFilterDto
    ): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number):Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if(!found) throw new NotFoundException(`Task ID ${id} was not found`);

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<number> {
        const result = await this.taskRepository.delete(id);

        if(!result.affected || result.affected === 0) throw new NotFoundException(`Task with ID ${id} was not found to be deleted`)

        return result.affected
    }

    async updateTaskStatus(
        id: number,
        status: TaskStatus
    ): Promise<Task> {

        const task: Task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
}
