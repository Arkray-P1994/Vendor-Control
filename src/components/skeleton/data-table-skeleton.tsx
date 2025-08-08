import { Skeleton } from "@/components/ui/skeleton";

export default function DataTableSkeleton() {
  return (
    <div className="w-full   min-h-screen">
      <div className=" mx-auto space-y-4">
        {/* Header with filter and view button */}
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Skeleton className="h-10 w-full " />
          </div>
          <Skeleton className="h-10 w-20 " />
        </div>

        {/* Table */}
        <div className="border  rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b ">
            <div className="col-span-1">
              <Skeleton className="h-4 w-8 " />
            </div>
            <div className="col-span-4">
              <Skeleton className="h-4 w-12 " />
            </div>
            <div className="col-span-6">
              <Skeleton className="h-4 w-20 " />
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 border-b  last:border-b-0 hover:/30"
            >
              {/* Task Number */}
              <div className="col-span-1 flex items-center">
                <Skeleton className="h-4 w-3 " />
              </div>

              {/* Title */}
              <div className="col-span-4 flex items-center">
                <Skeleton className="h-4 w-full max-w-48 " />
              </div>

              {/* Description */}
              <div className="col-span-6 flex items-center">
                <Skeleton className="h-4 w-full " />
              </div>

              {/* Menu Button */}
              <div className="col-span-1 flex items-center justify-end">
                <Skeleton className="h-8 w-8 rounded " />
              </div>
            </div>
          ))}
        </div>

        {/* Footer with pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-32 " />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20 " />
              <Skeleton className="h-8 w-16 " />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20 " />
              <div className="flex space-x-1">
                <Skeleton className="h-8 w-8 " />
                <Skeleton className="h-8 w-8 " />
                <Skeleton className="h-8 w-8 " />
                <Skeleton className="h-8 w-8 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
