import { Injectable } from "@nestjs/common";
import { NOTIFICATION_REQUEST } from "@repo/e-constants";
import { LoggerFactory } from "@repo/logger/build";

const logger = LoggerFactory.getLogger();

@Injectable()
export class NotificationConsumerService {
    async processNotificationEvent(notification: NOTIFICATION_REQUEST): Promise<void> {

    }
}
