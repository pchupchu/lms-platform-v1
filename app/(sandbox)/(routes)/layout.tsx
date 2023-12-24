const SandboxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full items-center justify-center bg-emerald-200'>
      {children}
    </div>
  );
};

export default SandboxLayout;
