import { AxiosError } from 'axios';

export const errorFormatter = (err: AxiosError): string => {
  return (err.response?.data as any)?.message ?? err.message;
};
