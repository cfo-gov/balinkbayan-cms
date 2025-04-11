'use client';

import { Button } from '@/shared/components/ui/button';
import { BellIcon, Menu } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './mobile-menu';
import { UserNav } from './user-nav';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
        <Button variant="ghost" className="p-0" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6 text-gray-700 " aria-hidden="true" />
        </Button>
        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

            <UserNav />
          </div>
        </div>
      </header>

      <MobileMenu open={sidebarOpen} onChange={setSidebarOpen} />
    </>
  );
};

export default Navbar;
