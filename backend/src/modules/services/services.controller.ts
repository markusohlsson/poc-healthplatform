import { Controller, Get, NotFoundException, Param, Body, Post } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ReturnServiceDto } from "./dto/return-service.dto";
import { plainToInstance } from "class-transformer";
import { CreateServiceDto } from "./dto/create-service.dto";

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get()
    async getAll(): Promise<ReturnServiceDto[]> {
        const services = await this.servicesService.findAll();
        return services.map(service => plainToInstance(ReturnServiceDto, service));
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<ReturnServiceDto> {
        const service = await this.servicesService.findById(+id);

        if(!service) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        return plainToInstance(ReturnServiceDto, service);
    }

    @Post()
    async create(@Body() dto: CreateServiceDto): Promise<ReturnServiceDto> {
        const service = await this.servicesService.create(dto);
        return plainToInstance(ReturnServiceDto, service)
    }

}