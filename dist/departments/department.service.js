"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("../entities/department.entity");
const sub_department_entity_1 = require("../entities/sub-department.entity");
let DepartmentService = class DepartmentService {
    departmentRepository;
    subDepartmentRepository;
    constructor(departmentRepository, subDepartmentRepository) {
        this.departmentRepository = departmentRepository;
        this.subDepartmentRepository = subDepartmentRepository;
    }
    async create(input) {
        if (input.name.length < 2) {
            throw new common_1.BadRequestException('Department name must be at least 2 characters long');
        }
        const department = this.departmentRepository.create({ name: input.name });
        await this.departmentRepository.save(department);
        if (input.subDepartments) {
            department.subDepartments = [];
            for (const subDept of input.subDepartments) {
                if (subDept.name.length < 2) {
                    throw new common_1.BadRequestException('Sub-department name must be at least 2 characters long');
                }
                const subDepartment = this.subDepartmentRepository.create({
                    name: subDept.name,
                    department,
                });
                await this.subDepartmentRepository.save(subDepartment);
                department.subDepartments.push(subDepartment);
            }
        }
        const foundDepartment = await this.departmentRepository.findOne({
            where: { id: department.id },
            relations: ['subDepartments'],
        });
        if (!foundDepartment) {
            throw new common_1.BadRequestException('Department not found');
        }
        return foundDepartment;
    }
    async findAll() {
        return this.departmentRepository.find({ relations: ['subDepartments'] });
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.BadRequestException('Department not found');
        }
        return department;
    }
    async update(id, input) {
        if (input.name && input.name.length < 2) {
            throw new common_1.BadRequestException('Department name must be at least 2 characters long');
        }
        const department = await this.findOne(id);
        if (input.name) {
            department.name = input.name;
        }
        return this.departmentRepository.save(department);
    }
    async remove(id) {
        const department = await this.findOne(id);
        await this.departmentRepository.remove(department);
        return true;
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(sub_department_entity_1.SubDepartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentService);
//# sourceMappingURL=department.service.js.map