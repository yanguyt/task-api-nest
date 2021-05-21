import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { SearchTaskDTO } from "./dto/search-task.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTask(filter: SearchTaskDTO, user:User): Promise<Task[]>{
        const {status, search} = filter

        const query = this.createQueryBuilder('task')

        if (status) {
           query.andWhere("task.status = :status", {status}) 
        }

        if (search) {
            query.andWhere("task.title LIKE :search OR task.description LIKE :search", {search: `%${search}%`})
        }

        const tasks = query.getMany()

        return tasks

    }

    async deleteTaskById(id: number): Promise<void> {
        let task = new Task()
        task.id = id

        await task.remove()

    }
}