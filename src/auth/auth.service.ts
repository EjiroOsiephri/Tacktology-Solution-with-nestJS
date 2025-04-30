import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(`User ${username} validated successfully`);
      const { password, ...result } = user;
      return result;
    }
    console.log(
      `Validation failed for ${username}: User not found or password incorrect`,
    );
    return null;
  }

  async login(username: string, password: string) {
    let user = await this.validateUser(username, password);
    if (!user) {
      // User doesn't exist, create a new one
      console.log(`Creating new user: ${username}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
      console.log(`User ${username} created successfully`);

      // Validate the newly created user
      user = await this.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException(
          'Failed to validate newly created user',
        );
      }
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
