import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./entities/service.entity";
import { CreateServiceDto } from "./dto/create-service.dto";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

  async findById(serviceId: number): Promise<Service | null> {
    return this.servicesRepository.findOneBy({ serviceId });
  }

    async findByName(serviceName: string): Promise<Service | null> {
    return this.servicesRepository.findOneBy({ name: serviceName });
    }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const existing = await this.findByName(createServiceDto.name);
    if (existing !== null) {
      throw new BadRequestException('Service already exists');
    }

    const service = this.servicesRepository.create({
      ...createServiceDto,
    });

    return this.servicesRepository.save(service);
  }
}
