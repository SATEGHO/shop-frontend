import { useQuery } from '@tanstack/react-query';
import { cartKeysFactory, productKeysFactory, userKeysFactory } from './keys.factory';
import { UserService } from '../user.service';
import { useUserStore } from '@/store/user.store';
import { ILoginData, IRegistrationData } from '@/types/user.requests';
import { toast } from 'react-hot-toast';
import { queryClient } from '.';

export const useCheckAuth = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery(userKeysFactory.checkAuth, () => UserService.checkAuth(), {
    onSuccess: (user) => setUser(user),
  });
};

type Handler = () => void;

export const useLoginUser = (data: ILoginData, cb?: Handler) => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery(userKeysFactory.login, () => UserService.login(data), {
    onSuccess: (user) => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(productKeysFactory.products);
      queryClient.invalidateQueries(cartKeysFactory.cartItems);
      setUser(user);
      toast.success('Успешный вход');
    },
    onError: (err: any) => err,
    enabled: false,
  });
};

export const useRegisterUser = (data: IRegistrationData, cb?: Handler) => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery(userKeysFactory.register, () => UserService.register(data), {
    onSuccess: (user) => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(productKeysFactory.products);
      queryClient.invalidateQueries(cartKeysFactory.cartItems);
      setUser(user);
      toast.success('Вы зарегистрировались');
    },
    onError: (err: any) => err,
    enabled: false,
  });
};
