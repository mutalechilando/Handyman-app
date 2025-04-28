import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  // Find a user by email (for login)
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Find a user by ID (optional, useful later)
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  // Create a new user (optional, for signup flow)
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role || 'user', // default role if not specified
      },
    });
  }

  // List all users (optional, useful for admin or testing)
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
