import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const vendorSchema = z.object({
  id: z.number(),
  direct: z.string(),
  plant: z.string(),
  vendor_code: z.string(),
  vendor_name: z.string(),
  ios_account: z.string(),
  is_active: z.boolean(),
  asl: z.boolean(), //check or x boolean
  critical: z.string(),
  category: z.string(),
  products: z.string(),
  msa: z.string(), //attachment
  supplier_evaluation_result: z.string(), //attachment
  supplier_evaluation: z.string(), //attachment
  dti_sec: z.string(), //attachment
  bir: z.string(), //attachment
  business_mayor_peza: z.string(), //attachment
  qms_iso: z.string(), //attachment
  financial_statement: z.string(), //attachment
  others: z.string(), //attachment
  contact_person: z.string(),
  email: z.string(),
  phone_number: z.string(),
  address: z.string(),
});

export type Vendor = z.infer<typeof vendorSchema>;
