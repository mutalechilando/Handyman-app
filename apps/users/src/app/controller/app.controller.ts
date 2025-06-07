import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "@users/decorators/public.decorator";

@Controller({
    version: VERSION_NEUTRAL,
    path: "/",
})
export class AppController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    ) { }

    @Get("/health")
    @HealthCheck()
    @Public()
    public async getHealth() {
        return this.healthCheckService.check([
            () => this.typeOrmHealthIndicator.pingCheck("database"),
        ]);
    }
}