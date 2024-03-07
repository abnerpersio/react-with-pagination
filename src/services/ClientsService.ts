import { httpClient } from './httpClient';

interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel:  string;
  vehicleManufacturer: string;
}

export class ClientsService {
  static async getAll() {
    const { data } = await httpClient.get<IClient[]>('/clients');

    return data;
  }
}
