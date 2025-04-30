import { DepartmentService } from './department.service';
import { Department } from '../entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
export declare class DepartmentResolver {
    private departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(input: CreateDepartmentInput): Promise<Department>;
    getDepartments(): Promise<Department[]>;
    updateDepartment(id: number, input: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<boolean>;
    removeDepartment(id: number): Promise<boolean>;
}
