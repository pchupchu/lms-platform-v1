import MobileSidebar from './mobile-sidebar';
import NavbarRoutes from './navbar-routes';

const Navbar = () => {
  return (
    <div className='flex items-center border-b bg-white p-4 shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
