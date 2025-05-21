import { ParkingColumns } from '@/components/columns/ParkingColumns';
import { DataTable } from '@/components/common/data-table';
import { useGetAllAvailableParkings } from '@/hooks/useParking';
import { Loader2 } from 'lucide-react';

const Parkings = () => {
  const { data, isLoading, isError } = useGetAllAvailableParkings();

  if (isLoading) {
    return <Loader2 className="animate-spin mx-auto my-8" />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center p-6">Error loading parkings</div>
    );
  }

  return (
    <div className="p-6">
      <DataTable
        data={data?.data ?? []}
        columns={ParkingColumns}
        searchEnabled
        message="No parking available"
      />
    </div>
  );
};

export default Parkings;
