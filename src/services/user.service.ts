import { ILoginData, IRegistrationData } from '@/types/user.requests';
import { $authhost, $host } from '.';
import jwt_decode from 'jwt-decode';
import { IUser } from '@/types/user.interface';

interface AuthResponse {
  access_token: string;
}

export const UserService = {
  async checkAuth(): Promise<IUser> {
    const response = await $authhost.post<AuthResponse>('/auth/check');
    const accessToken = response.data.access_token;
    localStorage.setItem('access_token', accessToken);

    const user = jwt_decode(accessToken) as IUser;
    return user;
  },

  async login(data: ILoginData): Promise<IUser> {
    const response = await $host.post<AuthResponse>('/auth/login', data);
    const accessToken = response.data.access_token;
    localStorage.setItem('access_token', accessToken);

    const user = jwt_decode(accessToken) as IUser;
    return user;
  },

  async register(data: IRegistrationData): Promise<IUser> {
    const response = await $host.post<AuthResponse>('/auth/register', data);
    const accessToken = response.data.access_token;
    localStorage.setItem('access_token', accessToken);

    const user = jwt_decode(accessToken) as IUser;
    return user;
  },
};
