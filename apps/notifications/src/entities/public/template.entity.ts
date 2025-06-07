import { UUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "template" })
export class Template extends Base {
    @PrimaryColumn({ name: "id", type: "uuid" })
    id: UUID;

    @Column({ name: "tenant_id", type: "uuid" })
    tenantId: UUID;

    @Column({ name: "channel_id", type: "int" })
    channelId: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "language", type: "varchar" })
    language: string;

    @Column({ name: "subject", type: "varchar" })
    subject: string;

    @Column({ name: "body", type: "text" })
    body: string;

    @Column({ name: "version", type: "int", default: 1 })
    version: number;

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean;
}
