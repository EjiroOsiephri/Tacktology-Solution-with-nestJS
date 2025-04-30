import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartment } from '../entities/sub-department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => SubDepartment)
export class SubDepartmentResolver {
  constructor(private subDepartmentService: SubDepartmentService) {}

  @Mutation(() => SubDepartment)
  @UseGuards(JwtAuthGuard)
  async createSubDepartment(@Args('input') input: CreateSubDepartmentInput) {
    return this.subDepartmentService.create(input);
  }

  @Query(() => [SubDepartment])
  @UseGuards(JwtAuthGuard)
  async getSubDepartments() {
    return this.subDepartmentService.findAll();
  }

  @Mutation(() => SubDepartment)
  @UseGuards(JwtAuthGuard)
  async updateSubDepartment(
    @Args('id') id: number,
    @Args('input') input: UpdateSubDepartmentInput,
  ) {
    return this.subDepartmentService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteSubDepartment(@Args('id') id: number) {
    return this.subDepartmentService.remove(id);
  }
}
