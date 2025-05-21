interface CarEntry {
  id: number;
  plateNumber: string;
  parkingCode: string;
  status: 'IN' | 'OUT';
  entryDateTime: string;
  exitDateTime?: string;
  chargedAmount?: number;
}

interface RegisterCarEntryDto {
  plateNumber: string;
  parkingCode: string;
}

interface RegisterCarExitResponse {
  chargedAmount: number;
  duration: number;
  car: CarEntry;
}

interface ServerResponse<T> {
  message: string;
  data: T;
}

interface CarReport {
  id: number;
  plateNumber: string;
  parkingCode: string;
  entryDateTime: string;
  exitDateTime?: string;
  chargedAmount?: number;
  status: 'IN' | 'OUT';
}

interface OutgoingCarsReport {
  total: number;
  cars: CarReport[];
}

interface EnteredCarsReport {
  count: number;
  cars: CarReport[];
}

interface Parking {
  id: string;
  code: string;
  name: string;
  numberOfSpaces: number;
  location: string;
  chargePerHour: number;
  description: string;
  createdAt: string;
}

interface CreateParkingDto {
  code: string;
  chargePerHour: number;
}

interface CarInside {
  plateNumber: string;
  entryDateTime: string;
  parkingCode: string;
}
