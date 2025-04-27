import { AxiosResponse } from 'axios';

export async function validateResponse(response: AxiosResponse): Promise<AxiosResponse> {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.data);
  } else {
    return Promise.resolve(response);
  }
}