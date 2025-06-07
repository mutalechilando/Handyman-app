import { UUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "notification" })
export class Notification extends Base {
    @PrimaryColumn({ name: "id", type: "uuid" })
    id: UUID;

    @Column({ name: "tenant_id", type: "uuid" })
    tenantId: string;

    @Column({ name: "template_id", type: "uuid" })
    templateId: UUID;

    @Column({ name: "channel_id", type: "int" })
    channelId: number;

    @Column({ name: "status_id", type: "int" })
    statusId: number;

    @Column({ name: "recipient", type: "varchar", length: 2048 })
    recipient: string;

    @Column({ name: "payload", type: "jsonb" })
    payload: any;

    @Column({ name: "scheduled_for", type: "timestamptz", nullable: true })
    scheduledFor: Date;
}
