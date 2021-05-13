import { IsIn, IsNotEmpty, IsOptional } from "class-validator"
import { TaskStatus } from "../task-status.enum"


export class SearchTaskDTO{
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
}