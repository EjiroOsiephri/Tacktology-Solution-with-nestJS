import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
  })
  subDepartments: SubDepartment[];
}
