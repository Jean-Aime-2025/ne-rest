import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCreateParking } from '@/hooks/useParking';

const createParkingSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters.'),
  name: z.string().min(1, 'Name is required.'),
  numberOfSpaces: z.coerce.number().min(1, 'Must have at least 1 space.'),
  location: z.string().min(3, 'Location is required.'),
  chargePerHour: z.coerce.number().min(1, 'Charge must be greater than 0.'),
  description: z.string().optional(),
});

type CreateParkingInput = z.infer<typeof createParkingSchema>;

type SlotFormProps = {
  setOpen: (open: boolean) => void;
};

const CreateParkingForm = ({ setOpen }: SlotFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateParkingInput>({
    resolver: zodResolver(createParkingSchema),
  });

  const { mutate: createParking, isPending } = useCreateParking();

  const onSubmit = (data: CreateParkingInput) => {
    createParking(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <form
      className="py-3 w-full flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="code">Code</Label>
          <Input id="code" {...register('code')} placeholder="PKG003" />
          {errors.code && (
            <span className="text-red-500 text-sm">{errors.code.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} placeholder="Mall Parking" />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="numberOfSpaces">Number of spaces</Label>
          <Input
            id="numberOfSpaces"
            type="number"
            {...register('numberOfSpaces')}
            placeholder="4"
          />
          {errors.numberOfSpaces && (
            <span className="text-red-500 text-sm">
              {errors.numberOfSpaces.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register('location')}
            placeholder="Sunshine Mall, 2nd Avenue"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="chargePerHour">Charge per hour (FRW)</Label>
        <Input
          id="chargePerHour"
          type="number"
          {...register('chargePerHour')}
          placeholder="1000"
        />
        {errors.chargePerHour && (
          <span className="text-red-500 text-sm">
            {errors.chargePerHour.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Parking for mall visitors"
        />
      </div>

      <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create parking'}
      </Button>
    </form>
  );
};

export default CreateParkingForm;
