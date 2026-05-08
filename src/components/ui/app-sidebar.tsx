'use client';
import { cn } from '@/src/lib/utils';
import NotificationCard from '@/src/components/common/notification-card';
import { NavUser } from '@/src/components/nav-user';
import { Button } from '@/src/components/ui/button';
import Logo from '@/src/components/ui/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/src/components/ui/sidebar';
import {
  LayoutDashboard,
  Bell,
  ClipboardList,
  MapPin,
  Settings,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient', label: 'Patient', icon: UserRound },
  { href: '/reminders', label: 'Reminders', icon: Bell },
  { href: '/?', label: '?', icon: ClipboardList },
  { href: '/location', label: 'Location', icon: MapPin },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='offcanvas' {...props} variant='inset'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='p-0 m-0 h-auto hover:bg-transparent'>
              <Link href='/dashboard' className='flex items-center gap-2'>
                <Logo className="w-8 h-8 object-contain rounded-full" />
                <span className='text-base font-semibold text-white'>
                  Kleo Care
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='mt-2 flex flex-1 flex-col gap-2'>
        <SidebarMenu>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2 py-1',
                    pathname === href
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  <Icon className='h-5 w-5 text-white/60' />
                  <span className='text-white'>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className='flex-1' />
      </SidebarContent>

      <div className='space-y-3 p-2'>
        <div className='flex flex-col gap-3 rounded-[28px] bg-zinc-800/50 p-3'>
          <NotificationCard
            title='Maria missed her morning medication'
            time='8m'
            location='Reminders'
            stackIndex={0}
            type='reminder'
          />
          <NotificationCard
            title='Task "Walk turtle" is overdue'
            time='22m'
            location='Tasks'
            stackIndex={1}
            offset
            type='task'
          />
          <div className='flex flex-row gap-2 rounded-xl'>
            <Button
              className='flex h-5.5 w-5.5 items-center justify-center rounded-full bg-red-300 p-2 text-xs text-black hover:bg-red-500'
              variant='destructive'
            >
              2
            </Button>
            <span className='text-sm font-onest text-white'>
              Notifications
            </span>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/settings' className='flex items-center gap-2'>
                <Settings size={18} className='text-white/60' />
                <span className='text-white'>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <SidebarFooter className='text-white'>
        <NavUser
          user={{
            name: 'Ioana',
            email: 'ionela@email.com',
            avatar: 'shadcn.jpg'
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}