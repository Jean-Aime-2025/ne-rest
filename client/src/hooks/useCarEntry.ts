/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCarsInside, registerCarEntry, registerCarExit } from '@/services/carEntry.service';
import { toast } from 'sonner';
import React from 'react';

export const useRegisterCarEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCarEntry,
    onSuccess: (data) => {
      toast.success(data.message || 'Car entry registered');
      queryClient.invalidateQueries({ queryKey: ['entered-cars-report','cars-inside'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Car entry failed');
    },
  });
};

export const useRegisterCarExit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCarExit,
    onSuccess: (data) => {
      const plateNumber = data.data.car.plateNumber;
      const backendUrl = `${import.meta.env.VITE_BASE_URL}/api/v1`; 
      const pdfUrl = `${backendUrl}/tickets/${plateNumber}.pdf`;

      toast(
        React.createElement(
          'div',
          null,
          React.createElement('div', null, `Car exited, charged ${data.data.chargedAmount} RWF`),
          React.createElement(
            'a',
            {
              href: pdfUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { textDecoration: 'underline', color: '#2563eb' },
            },
            'View your ticket (PDF)'
          )
        ),
        { duration: 8000 }
      );

      queryClient.invalidateQueries({ queryKey: ['outgoing-cars-report'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Car exit failed');
    },
  });
};

export const useCarsInside = () => {
  return useQuery({
    queryKey: ['cars-inside'],
    queryFn: fetchCarsInside,
  });
};
