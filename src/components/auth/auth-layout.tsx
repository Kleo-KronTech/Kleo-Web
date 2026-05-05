import { Form } from '@/src/components/ui/form';
import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from "react-hook-form";

export function AuthLayout<T extends FieldValues>({
  title,
  form,
  onSubmit,
  children
}: {
  title: string;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
}) {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4'>
      <div className='w-full max-w-md'>

        <div className='flex flex-col items-center gap-3 mb-8'>
          
          <span className='text-white text-lg font-semibold'>Kleo Care</span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl'
          >
            <h1 className='text-lg font-semibold text-white mb-4'>{title}</h1>

            {children}
          </form>
        </Form>
      </div>
    </div>
  );
}