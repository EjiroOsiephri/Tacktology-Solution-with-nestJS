import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from '../entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  async createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  @UseGuards(JwtAuthGuard)
  async getDepartments() {
    return this.departmentService.findAll();
  }

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('id') id: number,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(@Args('id') id: number) {
    return this.departmentService.remove(id);
  }
}
