import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@services/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials and return a JWT token if valid
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    
    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;  // Return user if credentials are correct
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Create the JWT payload
    return {
      access_token: this.jwtService.sign(payload),  // Sign and return the JWT token
    };
  }
}
