import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class SubDepartment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  department: Department;
}
