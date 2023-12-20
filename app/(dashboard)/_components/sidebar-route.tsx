'use client';

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

  const isActive = href === pathname || pathname?.startsWith(`${href}`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button type='button' onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarRoute;
