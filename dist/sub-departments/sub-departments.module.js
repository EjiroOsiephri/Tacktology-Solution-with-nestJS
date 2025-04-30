"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubDepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const sub_department_service_1 = require("./sub-department.service");
const sub_department_resolver_1 = require("./sub-department.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const sub_department_entity_1 = require("../entities/sub-department.entity");
const department_entity_1 = require("../entities/department.entity");
let SubDepartmentModule = class SubDepartmentModule {
};
exports.SubDepartmentModule = SubDepartmentModule;
exports.SubDepartmentModule = SubDepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sub_department_entity_1.SubDepartment, department_entity_1.Department])],
        providers: [sub_department_service_1.SubDepartmentService, sub_department_resolver_1.SubDepartmentResolver],
    })
], SubDepartmentModule);
//# sourceMappingURL=sub-departments.module.js.map