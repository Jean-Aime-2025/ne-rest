import * as React from 'react';
import { ArrowUpCircleIcon, ListIcon, Loader2 } from 'lucide-react';
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

const attendantNavItems = [
  {
    title: 'Parkings',
    url: '/attendant',
    icon: ListIcon,
  },
];

export function AttendantSidebar({
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
              <Link to="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Attendant Portal
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={attendantNavItems} />
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
