'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarRouteProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarRoute = ({ icon: Icon, label, href }: SidebarRouteProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = href === pathname || pathname?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      className={cn(
        'flex items-center gap-x-2 pl-6 text-sm font-medium text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
        isActive &&
          'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700',
      )}
      type='button'
      onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarRoute;
