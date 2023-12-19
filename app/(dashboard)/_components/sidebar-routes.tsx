'use client';

import { Compass, Layout } from 'lucide-react';

const GUEST_ROUTES = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const SidebarRoutes = () => {
  const routes = GUEST_ROUTES;

  return (
    <div className='flex flex-col'>
      <p>Sidebar Routes</p>
      <p>Sidebar Routes</p>
    </div>
  );
};

export default SidebarRoutes;
