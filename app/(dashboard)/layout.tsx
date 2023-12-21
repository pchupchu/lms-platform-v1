import Sidebar from './_components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed z-50 h-[80px] w-full md:pl-56'></div>
      <div className='fixed z-50 hidden h-full w-56 md:flex'>
        <Sidebar />
      </div>
      <main className='h-full md:pl-56'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
