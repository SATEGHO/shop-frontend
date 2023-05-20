import { IUser } from '@/types/user.interface';
import { create } from 'zustand';

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set(() => ({ user })),
}));
