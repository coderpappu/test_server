import createCompany from "./create.service";
import deleteCompany from "./delete.service";
import getAllCompany from "./get.service";
import getCompanyDetails from "./getdetails.service";
import updateCompany from "./update.service";

export const companyServices = {
  createCompany,
  getAllCompany,
  getCompanyDetails,
  updateCompany,
  deleteCompany,
};
