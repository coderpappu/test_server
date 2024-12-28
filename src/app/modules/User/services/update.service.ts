import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// update user
const updateUser = async (data: any) => {
  const id = data?.params?.id;

  if (!id) throw new AppError(404, "Please Provide the user Id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new AppError(404, "User not found");
    // check if the user trying to update is the owner of the profile

    if (id == user.id) {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: data?.body,
      });

      if (!updatedUser) throw new AppError(404, "User profile not updated");
      return updatedUser;
    }
  } catch (error) {
    throw error;
  }
};

export default updateUser;
