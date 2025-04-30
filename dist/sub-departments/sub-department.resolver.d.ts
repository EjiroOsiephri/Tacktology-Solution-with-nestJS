import { SubDepartmentService } from './sub-department.service';
import { SubDepartment } from '../entities/sub-department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
export declare class SubDepartmentResolver {
    private subDepartmentService;
    constructor(subDepartmentService: SubDepartmentService);
    createSubDepartment(input: CreateSubDepartmentInput): Promise<SubDepartment>;
    getSubDepartments(): Promise<SubDepartment[]>;
    updateSubDepartment(id: number, input: UpdateSubDepartmentInput): Promise<SubDepartment>;
    deleteSubDepartment(id: number): Promise<boolean>;
}
