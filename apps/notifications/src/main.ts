import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { version } from "@notifications/constants/index";
import { LoggerFactory, morganMiddleware } from "@repo/logger";
import helmet from "helmet";
import { AppModule } from "./app/module/app.module";
import { config } from "./config";
import { setupSwagger } from "./swagger";

const logger = LoggerFactory.getLogger();

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.use(helmet());
    app.use(morganMiddleware);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.setGlobalPrefix(version.GLOBAL_PREFIX);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: version.VERSION,
        prefix: version.VERSIONING_PREFIX,
    });

    const microserviceOptions: MicroserviceOptions = {
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${config.RABBIT_MQ_URI}`],
            queue: config.NOTIFICATION_QUEUE,
            queueOptions: { durable: true },
        }
    }

    setupSwagger(app);

    app.connectMicroservice(microserviceOptions);
    app.startAllMicroservices();

    await app
        .listen(config.APP_PORT, config.APP_HOST)
        .then(() =>
            logger.info(
                `${config.APP_NAME} service is listening on port ${config.APP_PORT} on ${config.APP_HOST}`,
            ),
        )
        .catch((error) =>
            logger.error(`${config.APP_NAME} service failed to start: ${error}`),
        );
}

bootstrap();
