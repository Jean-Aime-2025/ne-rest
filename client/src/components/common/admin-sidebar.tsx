import * as React from 'react';
import {
  ArrowUpCircleIcon,
  Car,
  ListIcon,
  Loader2,
  Outdent,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useGetUser } from '@/hooks/useUser';

const adminNavItems = [
  {
    title: 'Parkings',
    url: '/admin',
    icon: Car,
  },
  {
    title: 'Car entry',
    url: '/admin/carentry',
    icon: ListIcon,
  },
  {
    title: 'Car exit',
    url: '/admin/carexit',
    icon: Outdent,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading, error } = useGetUser();

  if (isLoading) {
    return <Loader2 />;
  }

  if (error || !data || !data.data?.user) {
    return <div>Error loading user info</div>;
  }

  const user = data.data.user;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/admin">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Admin Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            avatar: user.profilePicture ?? '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
