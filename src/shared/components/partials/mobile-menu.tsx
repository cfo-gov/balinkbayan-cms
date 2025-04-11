import { X } from 'lucide-react';

import { Sheet, SheetClose, SheetContent, SheetHeader } from '@/shared/components/ui/sheet';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import SidebarLinks from './sidebar-links';


type Props = {
  onChange: (arg: boolean) => void;
  open: boolean;
};

const MobileMenu = ({ open, onChange }: Props) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Sheet open={open} onOpenChange={onChange} defaultOpen={false}>
      <SheetContent side="left" className="w-[18rem] space-y-10 bg-white">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <Image src="/balinkbayan-sl.png" alt='balinkbayan' className={cn(
              'h-[100px] w-[420px] rounded-full',
              isMobile ? 'hidden' : 'block'
            )}
              width={400}
              height={100}
            />
            <SheetClose>
              <X className="h-5 w-5 text-black" />
            </SheetClose>
          </div>
        </SheetHeader>

        <SidebarLinks />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
