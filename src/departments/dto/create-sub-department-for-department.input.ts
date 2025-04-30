import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentForDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;
}
