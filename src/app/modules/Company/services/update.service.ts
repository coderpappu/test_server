import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

const updateCompany = async (data: any) => {
  const id = data?.params?.id;

  try {
    if (!id) {
      throw new AppError(404, "Company id not found!");
    }

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new AppError(404, "No such Company Exists!");
    }

    if (data.user.type === "SUPER_ADMIN" || data.user.type === "ADMIN") {
      if (data?.body?.company_name) {
        const companyNameExists = await prisma.company.findFirst({
          where: { company_name: data?.body?.company_name },
        });

        if (companyNameExists && companyNameExists.id !== id) {
          throw new AppError(409, "Company name already exists!");
        }
      }

      const updatedCompany = await prisma.company.update({
        where: { id },
        data: data.body,
      });

      return updatedCompany;
    } else {
      throw new AppError(403, "Unauthorized user type!");
    }
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export default updateCompany;
