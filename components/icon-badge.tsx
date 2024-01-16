import { VariantProps, cva } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

const backgroundVariants = cva(
  'flex items-center justify-center rounded-full border-black',
  {
    variants: {
      variant: {
        default: 'bg-sky-100',
        success: 'bg-emerald-100',
      },
      size: { default: 'p-2', sm: 'p-1' },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: { default: 'h-8 w-8', sm: 'h-4 w-4' },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;

interface IconBadgeProps extends BackgroundVariantsProps {
  // icon: LucideIcon;
}

const IconBadge = ({ variant, size }: IconBadgeProps) => {
  return <div className={backgroundVariants({ variant, size })}>XX</div>;
};

export default IconBadge;
