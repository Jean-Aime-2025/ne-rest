import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterCarEntry } from '@/hooks/useCarEntry';
import { useGetAllAvailableParkings } from '@/hooks/useParking';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const RegisterCarEntrySchema = z.object({
  plateNumber: z
    .string()
    .min(3, { message: 'Plate number must be at least 3 characters.' })
    .regex(/^[A-Z]{3}\d{3}[A-Z]$/, {
      message: 'Plate number format must be like RAA444T',
    }),
  parkingCode: z
    .string()
    .min(3, { message: 'Parking code must be at least 3 characters.' }),
});

type RegisterCarEntryFormValues = z.infer<typeof RegisterCarEntrySchema>;

const RegisterCarEntryForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterCarEntryFormValues>({
    resolver: zodResolver(RegisterCarEntrySchema),
  });

  const { mutate, isPending } = useRegisterCarEntry();
  const {
    data: availableParkings,
    isLoading: isParkingsLoading,
    isError,
  } = useGetAllAvailableParkings();

  const onSubmit = (data: RegisterCarEntryFormValues) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  if (isError) {
    return (
      <div className="text-red-500">
        An error occurred while fetching available parkings.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-3 flex flex-col gap-5"
    >
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="plateNumber">Plate number</Label>
          <Input
            id="plateNumber"
            {...register('plateNumber')}
            placeholder="RAA444T"
            disabled={isPending}
          />
          {errors.plateNumber && (
            <p className="text-sm text-red-500">
              {errors.plateNumber.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="parkingCode">Select parking</Label>
          <Select
            onValueChange={(val) => setValue('parkingCode', val)}
            disabled={isPending || isParkingsLoading}
            defaultValue={watch('parkingCode')}
          >
            <SelectTrigger id="parkingCode" className='w-full'>
              <SelectValue
                placeholder={
                  isParkingsLoading ? 'Loading parkings...' : 'Select parking'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableParkings?.data?.map((parking) => (
                <SelectItem key={parking.id} value={parking.code}>
                  {parking.code} - {parking.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.parkingCode && (
            <p className="text-sm text-red-500">
              {errors.parkingCode.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="cursor-pointer self-end"
        disabled={isPending}
      >
        <Plus className="mr-2" />
        <span>{isPending ? 'Entering...' : 'Enter'}</span>
      </Button>
    </form>
  );
};

export default RegisterCarEntryForm;
