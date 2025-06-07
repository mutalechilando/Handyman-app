export const NOTIFICATION_EVENT = {
    received: "notification.received",
    created: "notification.created",
    sent: "notification.sent",
    failed: "notification.failed",
}

export interface NOTIFICATION_REQUEST {
    requestId: string;
    timestamp: string;
    notificationType: NOTIFICATION_TYPE;
    channels: CHANNEL_TYPE[];
    recipients: RECIPIENT[];
    subscriptionId: number;
    message: MESSAGE;
    schedule: SCHEDULE_TIME;
    metadata: NOTIFICATION_METADATA;
}

export interface RECIPIENT {
    userId: string;
    email: string;
    phone: string;
}

export interface MESSAGE {
    subject: string;
    body: string;
    attachments: string[];
    icon: string;
    action: MESSAGE_ACTION;
}

export interface MESSAGE_ACTION {
    type: MESSAGE_ACTION_TYPE;
    url: string;
}

export interface SCHEDULE_TIME {
    sendAt: string;
}

export interface NOTIFICATION_METADATA {
    priority: NOTIFICATION_PRIORITY;
    tags: string[];
    retries: number;
}

export type NOTIFICATION_TYPE = "order" | "promotion" | "system";
export type CHANNEL_TYPE = "email" | "sms" | "push";
export type MESSAGE_ACTION_TYPE = "view" | "accept" | "decline";
export type NOTIFICATION_PRIORITY = "high" | "medium" | "low";
