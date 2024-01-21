import { cn } from './lib/utils';

const initialData = {
  description: null,
};

const result = cn(
  !initialData.description && 'italic text-slate-500',
  'flex items-center',
);

console.log(result);
