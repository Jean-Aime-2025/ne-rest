import type { ColumnDef } from "@tanstack/react-table";

export const CarEntryColumns: ColumnDef<CarReport>[] = [
  {
    accessorKey: 'plateNumber',
    header: 'Plate Number',
    cell: ({ row }) => (
      <div className="py-2">{row.getValue('plateNumber')}</div>
    ),
  },
  {
    accessorKey: 'parkingCode',
    header: 'Parking Code',
    cell: ({ row }) => (
      <div className="py-2">{row.getValue('parkingCode')}</div>
    ),
  },
  {
    accessorKey: 'entryDateTime',
    header: 'Entry Time',
    cell: ({ row }) => (
      <div className="py-2">{new Date(row.getValue('entryDateTime')).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'exitDateTime',
    header: 'Exit Time',
    cell: ({ row }) => (
      <div className="py-2">{new Date(row.getValue('exitDateTime')).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'chargedAmount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="py-2">{row.getValue('chargedAmount')} RWF</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="py-2">{row.getValue('status')}</div>
    ),
  },
];