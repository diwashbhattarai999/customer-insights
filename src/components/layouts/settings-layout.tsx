import { Link, Outlet, useLocation } from 'react-router';

import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'General', path: '/settings/general' },
  { name: 'Account', path: '/settings/account' },
  { name: 'Notifications', path: '/settings/notifications' },
  { name: 'Security', path: '/settings/security' },
  { name: 'Integrations', path: '/settings/integrations' },
];

export default function SettingsLayout() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="container flex py-4">
      <aside className="mr-8 h-fit w-64 rounded-md bg-muted/30 p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block rounded-md px-4 py-2.5 text-sm font-medium',
                'text-muted-foreground hover:bg-muted hover:text-primary',
                { 'bg-muted text-primary': isActive(item.path) }
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
