"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2 } from "lucide-react";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  consultFormDefaultValues,
  consultFormSchema,
} from "@/lib/schemas/consult-schema";

type ConsultTextFieldName = "name" | "email" | "phone";

const TEXT_FIELDS: Array<{
  name: ConsultTextFieldName;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  autoComplete: string;
}> = [
  {
    name: "name",
    label: "Nama Lengkap",
    type: "text",
    autoComplete: "name",
    placeholder: "Masukkan nama lengkap",
  },
  {
    name: "email",
    label: "Alamat Email",
    type: "email",
    autoComplete: "email",
    placeholder: "nama@email.com",
  },
  {
    name: "phone",
    label: "Nomor Telepon",
    type: "tel",
    autoComplete: "tel",
    placeholder: "08xxxxxxxxxx",
  },
];

export default function ConsultForm() {
  const form = useForm({
    defaultValues: consultFormDefaultValues,
    validators: { onSubmit: consultFormSchema },
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
    },
  });

  return (
    <form.Subscribe selector={(state) => state.isSubmitSuccessful}>
      {(isSubmitSuccessful) =>
        isSubmitSuccessful ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-semibold">Permintaan Anda sudah terkirim</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tim sales kami akan segera menghubungi Anda melalui email atau
              telepon yang terdaftar.
            </p>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {TEXT_FIELDS.map(({ name, label, type, placeholder, autoComplete }) => (
                <form.Field
                  key={name}
                  name={name}
                  validators={{
                    onBlur: consultFormSchema.shape[name] as z.ZodType<
                      string,
                      string
                    >,
                  }}
                >
                  {(field) => (
                    <Field
                      data-invalid={field.state.meta.errors.length > 0 || undefined}
                    >
                      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={type}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        value={field.state.value}
                        aria-invalid={field.state.meta.errors.length > 0}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              ))}

              <form.Field name="testDrive">
                {(field) => (
                  <Field orientation="horizontal">
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        Saya ingin menjadwalkan test drive
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                )}
              </form.Field>

              <form.Field name="agreeToTerms">
                {(field) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={field.state.meta.errors.length > 0 || undefined}
                  >
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      checked={field.state.value}
                      aria-invalid={field.state.meta.errors.length > 0}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        Saya menyetujui Syarat & Ketentuan dan Kebijakan
                        Privasi
                      </FieldLabel>
                      <FieldError errors={field.state.meta.errors} />
                    </FieldContent>
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            <div className="space-y-2">
              <FieldDescription>
                By using this service, you are agree to the Terms of Service
                and Privacy Policy
              </FieldDescription>
              <FieldDescription>
                By filling out this form, you are agree and allow the
                personal data you provide in this form to be processed,
                collected, used, disclosed and/or stored by TemanSales and
                its partners.
              </FieldDescription>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} className="w-full">
                  {isSubmitting ? "Mengirim..." : "Ajukan Konsultasi"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        )
      }
    </form.Subscribe>
  );
}
