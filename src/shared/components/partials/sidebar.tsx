'use client';

import Logo from './logo';
import SidebarLinks from './sidebar-links';

const Sidebar = () => {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-12 overflow-y-auto bg-sidebar p-6 text-white">
        <div className="px-2">
          <Logo className="mt-1 h-8 w-24" />
        </div>

        <SidebarLinks />
      </div>
    </aside>
  );
};

export default Sidebar;
