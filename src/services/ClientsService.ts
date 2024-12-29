import { httpClient } from './httpClient';
import { WithPagination } from './types';

interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleManufacturer: string;
}

export class ClientsService {
  static async getAll(page = 1, perPage = 10) {
    const { data } = await httpClient.get<WithPagination<IClient>>('/clients', {
      params: {
        _page: page,
        _per_page: perPage,
      },
    });

    return data;
  }
}
