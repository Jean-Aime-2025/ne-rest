import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { DataTable } from './data-table';
import { useEnteredCarsReport } from '@/hooks/useReports';
import { CarEntryColumns } from '../columns/CarEntryColumns';
import type { DateRange } from 'react-day-picker';

export default function EntryReport() {
  const [date, setDate] = useState<DateRange | undefined>(undefined); 

  const start = date?.from ? date.from.toISOString() : '';
  const end = date?.to ? date.to.toISOString() : '';

  const { data, isLoading } = useEnteredCarsReport(start, end);
  const cars = data?.data?.cars ?? [];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Entered Cars Report</h2>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {date?.from && date?.to
                ? `${format(date.from, 'PPP p')} - ${format(date.to, 'PPP p')}`
                : 'Select Date-Time Range'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <DataTable
        columns={CarEntryColumns}
        data={cars}
        isLoading={isLoading}
        searchEnabled
        message="No cars found in this date range."
      />
    </div>
  );
}
