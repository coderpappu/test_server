import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

interface TCompany {
  company_name: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postal_code?: string;
  email: string;
  phone_number: string;
  mobile_number?: string;
  fax?: string;
  website_url?: string;
  date_format: string;
  timezone: string;
  language?: string;
  currency_code?: string;
  currency_symbol?: string;
  logo?: string;
  company_registration_no: string;
  // userId?: string; // Uncomment if userId is required
}

const createCompany = async (data: TCompany, userId: string) => {
  const {
    company_name,
    address,
    country,
    city,
    state,
    postal_code,
    phone_number,
    company_registration_no,
    fax,
    website_url,
    date_format,
    timezone,
  } = data;

  // Validate required fields
  if (
    !company_name ||
    !address ||
    !country ||
    !city ||
    !state ||
    !phone_number
  ) {
    throw new AppError(400, "Please provide all required data");
  }

  try {
    // Check if company already exists for the user
    const companyExists = await prisma.company.findFirst({
      where: {
        userId: userId,
        AND: [{ company_name: company_name }],
      },
    });

    if (companyExists) {
      throw new AppError(
        400,
        "Company with this name or email already exists for the user"
      );
    }

    // Use a transaction to create the company and the associated setting
    const result = await prisma.$transaction(async (prisma) => {
      const createdCompanyDetails = await prisma.company.create({
        data: {
          company_name,
          address,
          country,
          city,
          state,
          postal_code,
          company_registration_no,
          phone_number,
          fax,
          website_url,
          date_format,
          timezone,
          userId,
        },
      });

      const createdSetting = await prisma.setting.create({
        data: {
          company_id: createdCompanyDetails.id,
          user_id: userId,
        },
      });

      return { createdCompanyDetails, createdSetting };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default createCompany;
