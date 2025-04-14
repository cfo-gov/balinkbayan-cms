import { type PropsWithChildren } from 'react';
import { Navbar } from '../partials';

const PageLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-8">
      <div className="flex flex-1 flex-col overflow-hidden lg:col-start-2 lg:col-end-3">
        <Navbar />
        <main className="container">{props.children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
