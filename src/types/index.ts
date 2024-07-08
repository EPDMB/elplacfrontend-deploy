import { ReactNode } from "react";

export enum formTypeEnum {
  login = "login",
  dashboard_user = "dashboard_user",
}

export enum dashboardEnum {
  profile = "profile",
  fairs = "fairs",
  products = "products",
  changeType = "changeType",
}

export interface IProfileContact {
  formikUser: any;
  getPropsSeller: (name: string) => IInputProps;
  getPropsUser: (name: string) => IInputProps;
  formikSeller: any;
  edit?: boolean;
}

export interface IProfileSettings {
  getProps: (name: string) => IInputProps;
  formikPass: any;
}

export interface IProfileLeftFilters {
  dashBoardFilter: string;
  setDashBoardFilter: (filter: string) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleChangePhotoClick: () => void;
  userRole: string | undefined;
}

export interface IProfileImage {
  className?: string;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleChangePhotoClick: () => void;
}

export interface CalendarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  fairDays?: FairDay[];
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
  dni?: string;
}
export interface IDashboardSellerErrors extends IDashboardUserErrors {
  phone?: string;
  address?: string;
  bank_account?: string;
  social_media?: string;
}

export interface ILoginFormErrors {
  email?: string;
  password?: string;
}

export interface ChooseRoleProps {
  email: string;
  userId: string;
}

export interface IUser {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IDashboardUser {
  name: string;
  lastname: string;
  email: string;
  dni: string;
}

export interface IDashboardSeller extends IDashboardUser {
  phone: string;
  address: string;
  bank_account: string;
  social_media: string;
}

export interface ISeller extends IUser {
  bank_account: string;
  social_media: string;
  phone: string | number;
  address: string;
  id?: string;
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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  errors?: string;
  edit?: boolean;
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

export interface IOption {
  id: string;
  name: string;
}

export interface FairCategories {
  category: Category;
  maxSellers: number;
  id: string;
  maxProductsSeller: number;
  minProductsSeller: number;

}

export interface Category {
  id: string;
  name: string;
}

export interface BuyerCapacity {
  id: string;
  hour: string;
  capacity: number;
}

export interface FairDay {
  id: string;
  day: string;
  buyerCapacities: BuyerCapacity[];
}

export interface IFair {
  id: string;
  name: string;
  address: string;
  entryPriceSeller: number;
  entryPriceBuyer: number;
  entryDescription: string;
  fairCategories: FairCategories[];
  fairDays: FairDay[];
}

export interface IFairContainer {
  fair: IFair;
}

export interface IFairContext {
  fairs: IFair[];
  setDateSelect: (date: Date) => void;
  setTimeSelect: (time: string) => void;
  timeSelect: string;
  dateSelect: Date | null;
  fairSelected: Partial<IFair> | null;
  setFairSelected: (fairSelected: any) => void;
}

export interface IFairProviderProps {
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
  dni: string;
  phone?: string;
  address?: string;
  bank_account?: string;
  credit_card?: string;
  userFairs?: string;
  social_media?: string;
  role?: string;
  seller?: ISeller;
}

export interface PaymentsSellerProps {
  sellerId?: string | undefined;
  fairId: string | undefined;
  categoryId: string | undefined;
  userId?: string | undefined;
  handleBuy: () => void;
  className: string;
  disabled: boolean;
}

export interface PaymentsUserProps {
  userId: string | undefined;
  fairId: string | undefined;
  registrationHour: string | null | undefined;
  registrationDay?: string | null | undefined;
  registratonDay: string | null | undefined;
  handleBuy: () => void;
  className: string;
  disabled: boolean;
}

export interface ModalProps {
  onCloseModal: () => void;
  message: string;
}

export interface TicketProps {
  name: string | null | [];
  salesChecked?: boolean;
  category?: string | null;
  termsChecked?: boolean;
}

export interface ProfileFairsProps {
  selectedOption: string | null | [];
  fairs: IFair[];
  handleSelect: (option: DropdownOption) => void;
  fairFilter?: IFair;
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

export type DropdownOption = {
  id: string;
  name: string;
};

export type DropdownProps = {
  label?: string | [];
  options?: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  className?: string;
  value?: string;
  placeholder?: string;
};

export interface ISidebarProps {
  userRole?: string;
}

export interface IDashboardCardProps {
  title: string;
  typeEnum: dashboardEnum;
  description: string;
}

export interface UniqueData {
  id: string;
  dni: string;
  email: string;
  userInfo: UserDto[];
  user: UserDto;

}
