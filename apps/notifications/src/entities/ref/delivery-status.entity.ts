import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "ref", name: "delivery_status" })
export class DeliveryStatus extends Base {
    @PrimaryColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "name", type: "varchar", unique: true })
    name: string;
}
