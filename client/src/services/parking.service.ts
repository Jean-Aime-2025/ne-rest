import api from '@/lib/api';

export const createParking = async (
  data: CreateParkingDto
): Promise<ServerResponse<Parking>> => {
  const response = await api.post('/parking', data);
  return response.data;
};

export const getAllAvailableParkings = async (): Promise<
  ServerResponse<Parking[]>
> => {
  const response = await api.get('/parking');
  return response.data;
};
