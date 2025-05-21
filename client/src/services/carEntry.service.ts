import api from "@/lib/api";

export const registerCarEntry = async (data: RegisterCarEntryDto): Promise<ServerResponse<CarEntry>> => {
  const response = await api.post('/car-action/entry', data);
  return response.data;
};

export const registerCarExit = async (plateNumber: string): Promise<ServerResponse<RegisterCarExitResponse>> => {
  const response = await api.put(`/car-action/exit/${plateNumber}`);
  return response.data;
};

export const fetchCarsInside = async (): Promise<ServerResponse<CarInside[]>> => {
  const response = await api.get('/car-action/cars-inside');
  return response.data;
};