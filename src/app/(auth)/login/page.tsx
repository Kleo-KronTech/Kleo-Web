"use client";
import { AuthLayout } from "@/src/components/auth/auth-layout";
import { Button } from "@/src/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";

const schema = z.object({
  email: z
    .string()
    .min(8, "Email is required")
    .max(40, "Email must be at most 40 characters long")
    .refine(validator.isEmail, { error: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .refine(validator.isStrongPassword, { error: "Password must be strong" }),
});

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  function onSubmit(data: z.infer<typeof schema>) {
    const result = schema.safeParse(data);
    if (!result.success) return;

    console.log("Login data:", result.data);
    //connect to api
  }

  return (
    <AuthLayout title="Login" form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="john@email.com"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#5e54b8]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="strong password"
                type="password"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#5e54b8]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="w-full bg-[#5e54b8] hover:bg-[#4e46a8] border border-[#4e46a8] text-white"
      >
        Submit
      </Button>
    </AuthLayout>
  );
}
