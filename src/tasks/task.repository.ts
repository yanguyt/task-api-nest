import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async deleteTaskById(id: number): Promise<void> {
        let task = new Task()
        task.id = id

        await task.remove()

    }
}