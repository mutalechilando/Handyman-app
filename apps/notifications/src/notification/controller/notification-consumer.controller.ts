import { Controller } from "@nestjs/common";
import { LoggerFactory } from "@repo/logger/build";
import { NotificationConsumerService } from "../service/notification-consumer.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NOTIFICATION_EVENT, NOTIFICATION_REQUEST } from "@repo/e-constants";

const logger = LoggerFactory.getLogger();

@Controller()
export class NotificationConsumerController {
    constructor(private readonly notificationConsumerService: NotificationConsumerService) { }

    @EventPattern(NOTIFICATION_EVENT.received)
    async handleNotificationEvent(@Payload() notification: NOTIFICATION_REQUEST): Promise<void> {
        try {
            await this.notificationConsumerService.processNotificationEvent(notification);
        } catch (err) {
            logger.error(`Failed to process notification event: ${err}`);
        }
    }
}
