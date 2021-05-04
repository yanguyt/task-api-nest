import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTaskDTO } from './dto/search-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAlltasks(): Task[]{
        return this.tasks;
    }

    searchForTasks(searchTaskDTO: SearchTaskDTO): Task[]{
        const {status, search} = searchTaskDTO

        let tasks = this.getAlltasks()

        if (status) {
            tasks = tasks.filter(item => item.status == status)
        }

        if (search) {
            tasks = tasks.filter(item => {
                return item.title.includes(search) ||
                item.description.includes(search);
            })
        }

        return tasks

    }

    createNewTask(createTaskDTO: CreateTaskDTO): Task{
        const {title, description} = createTaskDTO
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task;

    }

    getTaskById(id: string): Task{
        return this.tasks.find(el => el.id === id)
    }

    deleteTaskById(id: string): Task{
        const taskToRetrive = this.tasks.find(el => el.id === id)

        this.tasks = this.tasks.filter(el => el.id != id)

        return taskToRetrive
    }

    updateTaskById(id: string, status: TaskStatus): Task{
        this.tasks = this.tasks.map(el => {
            if (el.id === id) {
                el.status = status
            }
            return el;
        })

        return this.getTaskById(id)
    }
}
