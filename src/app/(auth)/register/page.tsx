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
import validator from "validator";
import { z } from "zod";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(40, "Username must be at most 40 characters long"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(40, "First name must be at most 40 characters long"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(40, "Last name must be at most 40 characters long"),
    email: z
      .string()
      .min(1, "Email is required")
      .refine(validator.isEmail, { message: "Invalid email address" }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .refine(validator.isStrongPassword, {
        message: "Password must be strong",
      }),
    repeatPassword: z.string().min(1, "Repeat password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const form = useForm<FormValues>({
    resolver: async (values) => {
      const result = schema.safeParse(values);

      if (result.success) {
        return { values: result.data, errors: {} };
      }

      const errors = result.error.issues.reduce(
        (acc, issue) => {
          const key = issue.path[0] as keyof FormValues;
          if (!acc[key]) {
            acc[key] = { type: issue.code, message: issue.message };
          }
          return acc;
        },
        {} as Partial<
          Record<keyof FormValues, { type: string; message: string }>
        >,
      );

      return { values: {}, errors };
    },
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onBlur",
  });

  function onSubmit(data: FormValues) {
    console.log("Register data:", data);
    //connect to api
  }

  return (
    <AuthLayout title="Register" form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#5e54b8]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="kjhgb"
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
      </div>
      <div className="grid grid-cols-2 gap-3">
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
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input
                  placeholder="repeat password"
                  type="password"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#5e54b8]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#5e54b8] hover:bg-[#4e46a8] border border-[#4e46a8] text-white"
      >
        Submit
      </Button>
    </AuthLayout>
  );
}
