import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CreateParkingForm from '../forms/CreateParkingForm';

type ParkingFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ParkingFormDialog = ({ open, setOpen }: ParkingFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] px-[3%] py-10 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Parking
          </DialogTitle>
        </DialogHeader>
        <CreateParkingForm setOpen={setOpen} />
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default ParkingFormDialog