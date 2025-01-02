import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";
import { TCompany } from "../company.interface";

const prisma = new PrismaClient();

const getCompanyDetails = async (id: string) => {
  if (!id) throw new AppError(404, "Please give a company ! ");

  try {
    const companyDetails = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyDetails) throw new AppError(404, "Company Details Not Found!");

    return companyDetails;
  } catch (error: any) {
    throw error;
  }
};

export default getCompanyDetails;
