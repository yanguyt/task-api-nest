import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTaskDTO } from './dto/search-task.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('/tasks')
@UseGuards(AuthGuard())
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

    @Get()
    getTasks(@Query() filter: SearchTaskDTO, @GetUser() user: User):Promise<Task[]>{
        return this.taskService.getTasks(filter, user)
    }

    @Get("/:id")
    async findTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task>{
        return this.taskService.getTaskById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task>{

        return this.taskService.createTask(createTaskDTO, user)

    }

    // @Delete("/:id")
    // deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task>{
    //     return this.taskService.deleteTaskById(id)
    // }

    // @Put("/:id/status")
    // updateStatusById(@Param("id", ParseIntPipe) id : number, @Body('status', TaskValidationPipe) status: TaskStatus): Promise<Task>{
    //     return this.taskService.updateTaskById(id, status)
    // }
}
