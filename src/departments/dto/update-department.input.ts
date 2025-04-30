import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;
}
