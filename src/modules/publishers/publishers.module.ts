import { Module } from "@nestjs/common";
import { PublishersController } from "./publishers.controller";
import { PublishersService } from "./publishers.service";

@Module({
    imports: [],
    controllers: [PublishersController],
    providers: [PublishersService],
    exports: [PublishersService],
})
export class PublishersModule {}
