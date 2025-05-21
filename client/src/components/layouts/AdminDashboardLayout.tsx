import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/common/site-header';
import { AdminSidebar } from '@/components/common/admin-sidebar';
import type { ReactNode } from 'react';

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout