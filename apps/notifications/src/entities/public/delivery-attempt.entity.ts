import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "delivery_attempt" })
export class DeliveryAttempt extends Base {
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "notification_id", type: "uuid" })
    notificationId: string;

    @Column({ name: "channel_id", type: "int" })
    channelId: number;

    @Column({ name: "attempt_number", type: "int", default: 1 })
    attemptNumber: number;

    @Column({ name: "status_id", type: "int" })
    statusId: number;

    @Column({ name: "attempt_at", type: "timestamptz", default: () => "NOW()" })
    attemptAt: Date;

    @Column({ name: "error_message", type: "varchar" })
    errorMessage: string;
}
