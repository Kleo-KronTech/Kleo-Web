import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

export default function GlowButton({
  icon,
  children,
  className,
  variant = 'default',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'variant'> & {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted';
}) {
  return (
    <Button
      {...props}
      className={cn(
        'rounded-2xl px-6 py-5 font-medium transition-all duration-200',

        variant === 'default' &&
          'bg-[#5e54b8] text-white border border-[#4e46a8] hover:bg-[#4e46a8] hover:border-[#3e3898] shadow-sm',

        variant === 'muted' &&
          'bg-transparent text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200',

        'hover:-translate-y-[1px] active:translate-y-0',

        className
      )}
    >
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
    </Button>
  );
}