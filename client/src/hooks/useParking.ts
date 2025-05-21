/* eslint-disable @typescript-eslint/no-explicit-any */
import { createParking, getAllAvailableParkings } from '@/services/parking.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateParking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createParking,
    onSuccess: (data) => {
      toast.success(data.message || 'Parking created');
      queryClient.invalidateQueries({ queryKey: ['available-parkings'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create parking');
    },
  });
};

export const useGetAllAvailableParkings = () => {
  return useQuery({
    queryKey: ['available-parkings'],
    queryFn: getAllAvailableParkings,
  });
};
