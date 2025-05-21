import { ParkingColumns } from "@/components/columns/ParkingColumns"
import { DataTable } from "@/components/common/data-table"
import ParkingFormDialog from "@/components/common/ParkingFormDialog";
import { useGetAllAvailableParkings } from "@/hooks/useParking";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const Parkings = () => {
  const { data, isLoading, isError } = useGetAllAvailableParkings();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) {
    return <Loader2 className="animate-spin mx-auto my-8" />;
  }

  if (isError) {
    return <div className="text-red-500 text-center p-6">Error loading parkings</div>;
  }

  const handleAddParking = () => {
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <DataTable
        data={data?.data ?? []} 
        columns={ParkingColumns}
        searchEnabled
         addButtonIcon={<Plus className="w-5 h-5 text-white" />}
        addButtonTitle="Add Parking"
        onAdd={handleAddParking}
        message="No parking found"
      />
      <ParkingFormDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
};

export default Parkings