import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    // @Get()
    // getAllTasks(@Query(ValidationPipe) searchTaskDTO: SearchTaskDTO): Task[]{
    //     if (Object.keys(searchTaskDTO).length) {
    //         return this.taskService.searchForTasks(searchTaskDTO)
    //     }else{
    //         return this.taskService.getAlltasks();
    //     }
        
    // }

    @Get("/:id")
    async findTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task>{
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task>{

        return this.taskService.createTask(createTaskDTO)

    }

    @Delete("/:id")
    deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task>{
        return this.taskService.deleteTaskById(id)
    }

    // @Put("/:id/status")
    // updateStatusById(@Param("id")id : string, @Body('status', TaskValidationPipe) status: TaskStatus): Task{
    //     return this.taskService.updateTaskById(id, status)
    // }
}
