import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// service for get user data
const getUserDetails = async (userId: string) => {
  if (!userId) throw new AppError(504, "User id not found!");
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userDetails) throw new AppError(404, "User not found!");
    return userDetails;
  } catch (error) {
    throw error;
  }
};

export default getUserDetails;
