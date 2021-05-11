import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTaskDTO } from './dto/search-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
   constructor(private taskRepository: TaskRepository){}

    async getTasks(filter: SearchTaskDTO): Promise<Task[]>{
        return this.taskRepository.getTask(filter)
    }

    async createTask(creatTaskDTO: CreateTaskDTO): Promise<Task>{
        const {title, description} = creatTaskDTO

        let task = new Task()

        task.title = title,
        task.description = description
        task.status = TaskStatus.OPEN

        await task.save()

        return task
    }

    async getTaskById(id:number): Promise<Task>{
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Taks with ${id} not found`)
        }

        return found
    }



    async deleteTaskById(id: number): Promise<Task>{
        const taskToRetrive = this.getTaskById(id)

        await this.taskRepository.deleteTaskById(id);

        return taskToRetrive
    }


    async updateTaskById(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id)
        task.status = status

        await task.save()

        return task

    }

    // updateTaskById(id: string, status: TaskStatus): Task{
    //     this.tasks = this.tasks.map(el => {
    //         if (el.id === id) {
    //             el.status = status
    //         }
    //         return el;
    //     })

    //     return this.getTaskById(id)
    // }
}
