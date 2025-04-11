import { Newspaper, SquarePlay, StickyNote } from 'lucide-react';
import { ROUTES } from './routes';

export const sidebarLinks = [
  {
    label: 'Posts',
    href: ROUTES.posts,
    icon: StickyNote,
  },
  {
    label: 'Pages',
    href: ROUTES.pages,
    icon: Newspaper,
  },
  {
    label: "Media",
    href: ROUTES.media,
    icon: SquarePlay,
  }
];
