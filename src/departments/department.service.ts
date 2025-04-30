import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { SubDepartment } from '../entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    if (input.name.length < 2) {
      throw new BadRequestException(
        'Department name must be at least 2 characters long',
      );
    }

    // Create and save the department first to ensure it has an ID
    const department = this.departmentRepository.create({ name: input.name });
    await this.departmentRepository.save(department);

    // Create and save sub-departments, linking them to the saved department
    if (input.subDepartments) {
      department.subDepartments = [];
      for (const subDept of input.subDepartments) {
        if (subDept.name.length < 2) {
          throw new BadRequestException(
            'Sub-department name must be at least 2 characters long',
          );
        }
        const subDepartment = this.subDepartmentRepository.create({
          name: subDept.name,
          department, // Link to the saved department
        });
        await this.subDepartmentRepository.save(subDepartment);
        department.subDepartments.push(subDepartment);
      }
    }

    // Return the department with sub-departments loaded
    const foundDepartment = await this.departmentRepository.findOne({
      where: { id: department.id },
      relations: ['subDepartments'],
    });
    if (!foundDepartment) {
      throw new BadRequestException('Department not found');
    }
    return foundDepartment;
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['subDepartments'] });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });
    if (!department) {
      throw new BadRequestException('Department not found');
    }
    return department;
  }

  async update(id: number, input: UpdateDepartmentInput): Promise<Department> {
    if (input.name && input.name.length < 2) {
      throw new BadRequestException(
        'Department name must be at least 2 characters long',
      );
    }
    const department = await this.findOne(id);
    if (input.name) {
      department.name = input.name;
    }
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
    return true;
  }
}
