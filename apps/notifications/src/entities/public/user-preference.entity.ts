import { UUID } from "crypto";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "user_preference" })
@Unique(["userId", "tenantId", "channelId"])
export class UserPreference extends Base {
    @PrimaryColumn({ name: "user_id", type: "uuid" })
    userId: UUID;

    @PrimaryColumn({ name: "tenant_id", type: "uuid" })
    tenantId: UUID;

    @PrimaryColumn({ name: "channel_id", type: "int" })
    channelId: number;

    @Column({ name: "opted_out", type: "boolean", default: false })
    optedOut: boolean
}
