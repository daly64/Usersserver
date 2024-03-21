import { PrismaClient } from "@prisma/client";

//0. instantiate the Prisma client
const prisma = new PrismaClient(); 


// 1. get all users
export const prismaGetAllUsers = async () => prisma.user.findMany();

// 2. get user by id
export const prismaGetUserById = async (id) =>
  prisma.user.findUnique({ where: { id } });

// 3. create a new user
export const prismaCreateUser = async (user) =>
  prisma.user.create({ data: user });

// 4. update user by id
export const prismaUpdateUser = async (id, user) =>
  prisma.user.update({ where: { id }, data: { ...user, name: user.name, score: user.score } });

// 5. delete user by id
export const prismaDeleteUser = async (id) =>
  prisma.user.delete({ where: { id } });



