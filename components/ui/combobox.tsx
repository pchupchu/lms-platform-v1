'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const animals = [
  {
    value: '1',
    label: 'Cat',
  },
  {
    value: '2',
    label: 'Dog',
  },
  {
    value: '3',
    label: 'Tiger',
  },
  {
    value: '4',
    label: 'Fox',
  },
  {
    value: '5',
    label: 'Rabbit',
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value
            ? animals.find((animal) => animal.value === value)?.label
            : 'Select animal...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search animal...' />
          <CommandEmpty>No animals found.</CommandEmpty>
          <CommandGroup>
            {animals.map((animal) => (
              <CommandItem
                key={animal.value}
                value={animal.label}
                onSelect={(currentValue) => {
                  const currentId = animals.find(
                    (animal) => animal.label.toLowerCase() === currentValue,
                  )?.value;
                  setValue(value === currentId ? '' : currentId);
                  setOpen(false);
                  console.log({ currentValue, currentId });
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === animal.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {animal.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
