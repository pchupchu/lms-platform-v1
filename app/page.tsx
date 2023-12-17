import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button variant={'destructive'}>Click me</Button>
      <p className='text-2xl text-red-500 lg:text-4xl'>Hello world</p>
    </div>
  );
}
