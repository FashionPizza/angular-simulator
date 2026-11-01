export interface IAuth {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export type IAuthUser = Omit<IAuth, 'accessToken' | 'refreshToken'>;