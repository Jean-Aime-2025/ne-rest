import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/common/site-header';
import { type ReactNode } from 'react';
import { AttendantSidebar } from '../common/attendant-sidebar';

const AttendantDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AttendantSidebar variant="inset" />
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

export default AttendantDashboardLayout