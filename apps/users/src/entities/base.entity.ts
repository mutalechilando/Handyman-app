import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Base {
    @Column({ name: "is_deleted", type: "boolean", default: false })
    isDeleted: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt: Date;
}