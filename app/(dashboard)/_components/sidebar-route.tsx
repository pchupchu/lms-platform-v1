'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarRouteProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarRoute = ({ icon: Icon, label, href }: SidebarRouteProps) => {
  const pathname = usePathname();
  const isActive = href === pathname || pathname?.startsWith(`${href}`);

  return <div>Sidebar route</div>;
};

export default SidebarRoute;
