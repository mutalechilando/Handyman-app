import { UUID } from "crypto";

export interface Template {
    id: UUID;
    tenantId: UUID;
    channelId: number;
    name: string;
    language: string;
    subject: string;
    body: string;
    version: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TemplateRequest {
    id: UUID;
    tenantId: UUID;
    channelId: number;
    name: string;
    language: string;
    subject: string;
    body: string;
    version: number;
    isActive: boolean;
}
