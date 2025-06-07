import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "notification_audit" })
export class NotificationAudit extends Base {
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "notification_id", type: "uuid" })
    notificationId: UUID;

    @Column({ name: "old_status_id", type: "int" })
    oldStatusId: number;

    @Column({ name: "new_status_id", type: "int" })
    newStatusId: number;

    @Column({ name: "changed_at", type: "timestamptz", default: () => "NOW()" })
    changedAt: Date;
}
