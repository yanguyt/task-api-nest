import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTaskDTO } from './dto/search-task.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';

import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(@Query(ValidationPipe) searchTaskDTO: SearchTaskDTO): Task[]{
        if (Object.keys(searchTaskDTO).length) {
            return this.taskService.searchForTasks(searchTaskDTO)
        }else{
            return this.taskService.getAlltasks();
        }
        
    }

    @Get("/:id")
    findTaskById(@Param("id") id: string): Task{
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDTO: CreateTaskDTO): Task{

        return this.taskService.createNewTask(createTaskDTO)

    }

    @Delete("/:id")
    deleteTaskById(@Param("id") id: string): Task{
        return this.taskService.deleteTaskById(id)
    }

    @Put("/:id/status")
    updateStatusById(@Param("id")id : string, @Body('status', TaskValidationPipe) status: TaskStatus): Task{
        return this.taskService.updateTaskById(id, status)
    }
}
