// app/todo/page.tsx or pages/todo.tsx (depends on routing system)

import { useTasks } from "@/api/task";
import { ModeToggle } from "@/components/mode-toggle";
import DataTableSkeleton from "@/components/skeleton/data-table-skeleton";
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
import { columns } from "./components/columns";
import { DataTable } from "../../components/data-table/data-table";
import { Navbar } from "@/components/layout/nav";
import { TasksDialogs } from "./components/tasks-dialogs";
import TasksProvider from "./context";
import vendors from "./data/vendor";

export default function VendorPage() {
  const { tasks, isLoading } = useTasks();

  return (
    <TasksProvider>
      {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Todo List</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header> */}
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <DataTable data={vendors} columns={columns} />
      )}
      <TasksDialogs />
    </TasksProvider>
  );
}
