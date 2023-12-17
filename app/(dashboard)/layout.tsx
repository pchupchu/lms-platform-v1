const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full items-center justify-center bg-gray-500'>
      {children}
    </div>
  );
};

export default DashboardLayout;
