import { Module } from '@nestjs/common';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartmentResolver } from './sub-department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubDepartment } from '../entities/sub-department.entity';
import { Department } from '../entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubDepartment, Department])],
  providers: [SubDepartmentService, SubDepartmentResolver],
})
export class SubDepartmentModule {}
