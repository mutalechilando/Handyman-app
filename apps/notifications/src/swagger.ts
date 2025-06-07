import { INestApplication } from "@nestjs/common";
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from "@nestjs/swagger";
import { config } from "@notifications/config/index";
import { swaggerDocs } from "@notifications/constants/index";
import { LoggerFactory } from "@repo/logger/build";

const logger = LoggerFactory.getLogger();

export const setupSwagger = async (app: INestApplication): Promise<void> => {
    try {
        const swaggerConfig = new DocumentBuilder()
            .setTitle(swaggerDocs.NAME)
            .setDescription(swaggerDocs.DESCRIPTION)
            .setVersion(swaggerDocs.VERSION)
            .addBearerAuth(
                {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    name: "JWT",
                    description: "Enter JWT token",
                    in: "header",
                },
                "access-token",
            )
            .addBearerAuth(
                {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    name: "JWT",
                    description: "Enter JWT token",
                    in: "header",
                },
                "refresh-token",
            )
            .build();

        const swaggerDocument = SwaggerModule.createDocument(
            app,
            swaggerConfig,
            {
                deepScanRoutes: true,
            },
        );

        const swaggerOptions: SwaggerCustomOptions["swaggerOptions"] = {
            docExpansion: "none",
            persistAuthorization: true,
            displayOperationId: true,
            operationsSorter: "method",
            tagsSorter: "alpha",
            tryItOutEnabled: true,
            filter: true,
        };

        SwaggerModule.setup(swaggerDocs.PREFIX, app, swaggerDocument, {
            explorer: true,
            customSiteTitle: swaggerDocs.NAME,
            swaggerOptions,
        });
        logger.info(
            `Swagger docs available at ${config.APP_HOST}:${config.APP_PORT}${swaggerDocs.PREFIX}`,
        );
    } catch (error) {
        logger.error(
            `Error setting up Swagger documentation: ${error.message}`,
        );
    }
};
