import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { config } from "@notifications/config/env";
import { NotificationConsumerController } from "../controller/notification-consumer.controller";
import { NotificationConsumerService } from "../service/notification-consumer.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: config.APP_NAME,
                transport: Transport.RMQ,
                options: {
                    urls: [`amqp://${config.RABBIT_MQ_URI}`],
                    queue: config.NOTIFICATION_QUEUE,
                    queueOptions: { durable: true },
                }
            }
        ])
    ],
    controllers: [NotificationConsumerController],
    providers: [NotificationConsumerService]
})
export class NotificationModule { }
