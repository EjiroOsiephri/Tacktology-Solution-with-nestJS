import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
