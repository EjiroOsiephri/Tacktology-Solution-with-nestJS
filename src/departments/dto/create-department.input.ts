import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { CreateSubDepartmentForDepartmentInput } from './create-sub-department-for-department.input';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentForDepartmentInput], { nullable: true })
  @IsOptional()
  subDepartments?: CreateSubDepartmentForDepartmentInput[];
}
