import * as z from "zod";

const companyValidationSchema = z.object({
  company_name: z.string().min(1),
  address: z.string(),
  country: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string().optional(),
  phone_number: z.string(),
  faxNo: z.string().optional(),
  website_url: z.string().url().optional(),
  timezone: z.string(),
});

export default companyValidationSchema;
