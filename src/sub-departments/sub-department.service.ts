import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubDepartment } from '../entities/sub-department.entity';
import { Department } from '../entities/department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

@Injectable()
export class SubDepartmentService {
  constructor(
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(input: CreateSubDepartmentInput): Promise<SubDepartment> {
    if (input.name.length < 2) {
      throw new BadRequestException(
        'Sub-department name must be at least 2 characters long',
      );
    }
    const department = await this.departmentRepository.findOne({
      where: { id: input.departmentId },
    });
    if (!department) {
      throw new BadRequestException('Department not found');
    }
    const subDepartment = this.subDepartmentRepository.create({
      name: input.name,
      department,
    });
    return this.subDepartmentRepository.save(subDepartment);
  }

  async findAll(): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({ relations: ['department'] });
  }

  async findOne(id: number): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!subDepartment) {
      throw new BadRequestException('Sub-department not found');
    }
    return subDepartment;
  }

  async update(
    id: number,
    input: UpdateSubDepartmentInput,
  ): Promise<SubDepartment> {
    if (input.name && input.name.length < 2) {
      throw new BadRequestException(
        'Sub-department name must be at least 2 characters long',
      );
    }
    const subDepartment = await this.findOne(id);
    if (input.name) {
      subDepartment.name = input.name;
    }
    return this.subDepartmentRepository.save(subDepartment);
  }

  async remove(id: number): Promise<boolean> {
    const subDepartment = await this.findOne(id);
    await this.subDepartmentRepository.remove(subDepartment);
    return true;
  }
}
