import api from "@/lib/api";



export const getOutgoingCarsReport = async (start: string, end: string): Promise<ServerResponse<OutgoingCarsReport>> => {
  const response = await api.get('/reports/outgoing', { params: { start, end } });
  return response.data;
};

export const getEnteredCarsReport = async (start: string, end: string): Promise<ServerResponse<EnteredCarsReport>> => {
  const response = await api.get('/reports/entered', { params: { start, end } });
  return response.data;
};
