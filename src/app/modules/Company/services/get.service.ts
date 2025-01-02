import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";
import { TCompany } from "../company.interface";

const prisma = new PrismaClient();

const getAllCompany = async (userId: string) => {
  let allCompany: TCompany;

  // if (!userId) throw new AppError(404, "User Id Not Found");

  try {
    const allCompany = await prisma.company.findFirst({
      where: {},
    });

    // if (!allCompany || allCompany.length <= 0) {
    //   throw new AppError(404, "Company not found !");
    // }

    return allCompany;
  } catch (error) {
    throw error;
  }
};

export default getAllCompany;
