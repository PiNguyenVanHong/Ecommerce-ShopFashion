"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/dashboard/[storeId]/(routes)/colors/_components/cell-action";

export type ColorColumn = {
  stt: number;
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "stt",
    header: "STT",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between w-[100px]">
          {row.original.value}
          <div 
            className="h-6 w-6 rounded-full border"
            style={{ backgroundColor: row.original.value }}
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