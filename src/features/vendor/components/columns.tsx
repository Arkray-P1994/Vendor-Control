import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { labels } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { StatusBadge } from "@/components/status-badge";
import type { Vendor } from "../data/schema";
import { Check, X } from "lucide-react";

export const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "direct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Direct" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.direct);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("direct")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "plant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plant" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.plant);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("plant")}
          </span>
        </div>
      );
    },
  },
  ...[
    "vendor_code",
    "vendor_name",
    "ios_account",
    "critical",
    "products",
    "msa",
    "supplier_evaluation_result",
    "supplier_evaluation",
    "dti_sec",
    "bir",
    "business_mayor_peza",
    "qms_iso",
    "financial_statement",
    "others",
    "contact_person",
    "email",
    "phone_number",
    "address",
  ].map((key) => ({
    accessorKey: key,
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title={key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original[key]);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue(key)}
          </span>
        </div>
      );
    },
  })),
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.category
      );
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("category")}
          </span>
        </div>
      );
    },
    enableHiding: true, // ✅ Allow this column to be hidden
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("is_active") as boolean;
      return <StatusBadge active={value} />;
    },
  },

  {
    accessorKey: "asl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ASL" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("asl") as boolean;
      return (
        <Badge
          variant="outline"
          className={value ? "text-green-600" : "text-red-600"}
        >
          {value ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Badge>
      );
    },
  },
];
