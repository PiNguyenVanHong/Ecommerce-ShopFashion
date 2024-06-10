"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/dashboard/[storeId]/(routes)/products/_components/cell-action";
import { Badge } from "@/components/ui/badge";

export type ProductColumn = {
  id: string;
  stt: number;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "stt",
    header: "STT",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => {
      return (
        <Badge 
          variant={row.original.isArchived ? 
              "emerald" : "purple"}
        >{row.original.isArchived ? "true" : "false"}</Badge>
      )
    }
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      return (
        <Badge 
          variant={row.original.isFeatured ? 
              "emerald" : "purple"}
        >{row.original.isFeatured ? "true" : "false"}</Badge>
      )
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between w-[100px]">
          {row.original.color}
          <div 
            className="h-6 w-6 rounded-full border"
            style={{backgroundColor: row.original.color}}
          ></div>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
];