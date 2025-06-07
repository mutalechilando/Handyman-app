import { config } from "@auth/config/index";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from "nest-keycloak-connect";

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: config.KEYCLOAK_URL,
            realm: config.KEYCLOAK_REALM,
            clientId: config.KEYCLOAK_CLIENT_ID,
            secret: config.KEYCLOAK_SECRET,
            cookieKey: "KEYCLOAK_JWT",
            logLevels: ["error"]
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard
        }
    ]
})
export class KeycloakModule { }
