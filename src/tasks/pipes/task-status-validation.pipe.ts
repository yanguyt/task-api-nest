import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";


export class TaskValidationPipe implements PipeTransform{
    readonly statusToCheck = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any){
        const status = value.toUpperCase();

        if (!this.isStatusValid(status)) {
            return new BadRequestException(`this ${status} is not valid`)
        }

        return status

    }

    private isStatusValid(status: any){
        const idx = this.statusToCheck.indexOf(status)

        return idx !== -1

    }
}