import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// service for get user data
const getUsers = async () => {
  try {
    const allUser = await prisma.user.findMany({});
    return allUser;
  } catch (error) {
    throw error;
  }
};

export default getUsers;
