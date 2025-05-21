import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterCarExit, useCarsInside } from '@/hooks/useCarEntry';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegisterCarExitSchema = z.object({
  plateNumber: z
    .string()
    .min(3, { message: 'Plate number must be at least 3 characters.' })
    .regex(/^[A-Z]{3}\d{3}[A-Z]$/, {
      message: 'Plate number format must be like RAA444T',
    })
});

type RegisterCarExitFormValues = z.infer<typeof RegisterCarExitSchema>;

const RegisterCarExitForm = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterCarExitFormValues>({
    resolver: zodResolver(RegisterCarExitSchema),
  });

  const { mutate, isPending } = useRegisterCarExit();
  const { data, isLoading } = useCarsInside();

  const onSubmit = (data: RegisterCarExitFormValues) => {
    mutate(data.plateNumber, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-3 w-full flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="plateNumber">Select Plate Number</Label>
        <Select
          onValueChange={(val) => setValue('plateNumber', val)}
          disabled={isPending || isLoading}
          defaultValue={watch('plateNumber')}
        >
          <SelectTrigger id="plateNumber">
            <SelectValue placeholder={isLoading ? "Loading cars..." : "Select a plate number"} />
          </SelectTrigger>
          <SelectContent>
            {data?.data.map((car) => (
              <SelectItem key={car.plateNumber} value={car.plateNumber}>
                {car.plateNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.plateNumber && (
          <p className="text-sm text-red-500">{errors.plateNumber.message}</p>
        )}
      </div>

      <Button type="submit" className="self-end cursor-pointer" disabled={isPending}>
        <LogOut className="mr-2" />
        <span>{isPending ? 'Exiting...' : 'Exit'}</span>
      </Button>
    </form>
  );
};

export default RegisterCarExitForm;
