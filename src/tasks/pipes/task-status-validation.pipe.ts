import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGESS,
        TaskStatus.DONE,
    ]


    transform(value: any, meta: ArgumentMetadata) {
        let upperCaseValue = value.toUpperCase();

        if(!this.isStatusValied(upperCaseValue)) throw new BadRequestException(`${value} is not a valid status`);

        return value;
    }

    private isStatusValied(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}