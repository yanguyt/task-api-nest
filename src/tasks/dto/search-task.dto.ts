import { TaskStatus } from "../tasks.model"

export class SearchTaskDTO{
    search: string
    status: TaskStatus
}