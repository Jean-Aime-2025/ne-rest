import { type ColumnDef } from '@tanstack/react-table';

export const ParkingColumns: ColumnDef<Parking>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div className='py-2'>{row.original.code}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='py-2'>{row.original.name}</div>,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <div className='py-2'>{row.original.location}</div>,
  },
  {
    accessorKey: 'numberOfSpaces',
    header: 'Number Of Spaces',
    cell: ({ row }) => <div className='py-2'>{row.original.numberOfSpaces}</div>,
  },
  {
    accessorKey: 'chargePerHour',
    header: 'Charge Per Hour',
    cell: ({ row }) => <div className='py-2'>{row.original.chargePerHour}</div>,
  },
];
