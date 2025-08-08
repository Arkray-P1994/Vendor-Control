import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { tasks } from "@/data/tasks";
import { columns } from "@/features/tasks/components/columns";

import { ModeToggle } from "@/components/mode-toggle";
import { TasksDialogs } from "@/features/tasks/components/tasks-dialogs";
import TasksProvider from "@/features/tasks/context";
import { DataTable } from "@/components/data-table/data-table";

export default function Tasks() {
  return (
    <TasksProvider>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex justify-between items-center w-full">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
      <div className=" flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <DataTable data={tasks} columns={columns} />
      </div>
      <TasksDialogs />
    </TasksProvider>
  );
}
