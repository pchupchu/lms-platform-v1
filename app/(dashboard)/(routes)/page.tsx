import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <Button variant={'destructive'}>Click me</Button>
      <p className='text-2xl text-red-500 lg:text-4xl'>Hello world</p>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
