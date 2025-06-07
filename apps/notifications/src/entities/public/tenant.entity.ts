import { UUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "public", name: "tenant" })
export class Tenant extends Base {
    @PrimaryColumn({ name: "id", type: "uuid" })
    id: UUID;

    @Column({ name: "name", type: "varchar", unique: true })
    name: string;

    @Column({ name: "settings", type: "jsonb" })
    settings: any;
}
