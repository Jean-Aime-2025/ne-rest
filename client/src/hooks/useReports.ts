import { useQuery } from '@tanstack/react-query';
import { getOutgoingCarsReport, getEnteredCarsReport } from '@/services/report.service';

export const useOutgoingCarsReport = (start: string, end: string) => {
  return useQuery({
    queryKey: ['outgoing-cars-report', start, end],
    queryFn: () => getOutgoingCarsReport(start, end),
    enabled: !!start && !!end,
  });
};

export const useEnteredCarsReport = (start: string, end: string) => {
  return useQuery({
    queryKey: ['entered-cars-report', start, end],
    queryFn: () => getEnteredCarsReport(start, end),
    enabled: !!start && !!end,
  });
};
