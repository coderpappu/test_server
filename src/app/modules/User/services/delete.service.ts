import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// delete User Account
const deleteUser = async (id: string) => {
  if (!id) throw new AppError(404, "User Id Not Found");

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new AppError(404, "User not found");
    }

    let deletedAccount = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedAccount;
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
