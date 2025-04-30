import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(input: LoginInput): Promise<{
        access_token: string;
    }>;
}
