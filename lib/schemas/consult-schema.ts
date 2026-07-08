import { z } from "zod";

export const consultFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(80, "Nama maksimal 80 karakter"),
  email: z.email("Masukkan alamat email yang valid"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+62|62|0)8\d{8,11}$/, "Masukkan nomor telepon Indonesia yang valid"),
  testDrive: z.boolean(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi",
  }),
});

export type ConsultFormValues = z.infer<typeof consultFormSchema>;

export const consultFormDefaultValues: ConsultFormValues = {
  name: "",
  email: "",
  phone: "",
  testDrive: false,
  agreeToTerms: false,
};
