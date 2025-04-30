import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './departments/department.module';
import { SubDepartmentModule } from './sub-departments/sub-departments.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // explicitly point to the file
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback-secret-for-testing',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    DepartmentModule,
    SubDepartmentModule,
  ],
})
export class AppModule {}
