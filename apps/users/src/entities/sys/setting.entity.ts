import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity({ schema: "sys", name: "setting" })
export class Setting extends Base {
    @PrimaryColumn({ name: "key" })
    key: string = "";

    @Column({ name: "value" })
    value: string = "";
}