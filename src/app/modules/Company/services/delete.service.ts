import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

const deleteCompany = async (params: any) => {
  const id = params?.id;

  if (!id) throw new AppError(404, "Invalid Company ID!");

  try {
    const companyExists = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyExists) throw new AppError(409, "Company not exists");

    const deletedcompany = await prisma.company.delete({
      where: {
        id,
      },
    });

    return deletedcompany;
  } catch (error) {
    throw error;
  }
};

export default deleteCompany;
