import { ReactNode } from "react";

export enum formTypeEnum {
  login = "login",
  dashboard_user = "dashboard_user",
}

export interface IRegisterFormErrors {
  name?: string;
  lastname?: string;
  dni?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
  bank_account?: string;
  social_media?: string;
}
export interface IDashboardUserErrors {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ILoginFormErrors {
  email?: string;
  password?: string;
}

export interface IUser {
  name: string;
  lastname: string;
  dni: number;
  email: string;
  phone: string | number;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface IDashboardUser {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

export interface ISeller extends IUser {
  bank_account: string;
  social_media: string;
}

export interface IInputProps {
  label: string;
  formType: formTypeEnum;
  value?: any;
  userType?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
  userData: IUser | null;
  setUserData: (userData: IUser) => void;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IRegisterProps {
  onUserTypeChange: (userType: boolean) => void;
  userType: boolean;
}

export interface UserDto {
  id: string;
  profile_picture?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  bank_account?: string;
  credit_card?: string;
  ferias?: string;
  role?: string;
}

export interface ProfileImageContextType {
  userDtos: UserDto | null;
  setUserDtos: React.Dispatch<React.SetStateAction<UserDto | null>>;
  profileImageChanged: boolean;
  setProfileImageChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileImageProviderProps {
  children: ReactNode;
}

export interface PlaceReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
}

export interface IPasswordChange {
  current_password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IPasswordChangeErrors {
  current_password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface IRegisterViewProps {
  userTypeParam: string;
}

export interface RegisterViewPageProps {
  params: {
    userType: string;
  };
}

  export interface DashboardProps {
    userDtos: UserDto;
  }

  export interface userDashboardProps {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    userDtos: UserDto;
  }
