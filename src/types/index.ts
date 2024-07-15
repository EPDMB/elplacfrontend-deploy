import { ReactNode } from "react";

export enum formTypeEnum {
  login = "login",
  dashboard_user = "dashboard_user",
  fair = "fair",
  profile = "profile",
  products = "products",
}

export enum dashboardEnum {
  profile = "profile",
  fairs = "fairs",
  products = "products",
  changeType = "changeType",
}

export enum statusGeneralEnum {
  active = "active",
  inactive = "inactive",
  blocked = "blocked",
}

export enum profilesEnum {
  admin = "admin",
  seller = "seller",
  user = "user",
}

export enum productsStatusEnum {
  accepted = "accepted",
  notAccepted = "notAccepted",
  notAvailable = "notAvailable",
  categoryNotApply = "categoryNotApply",
  secondMark = "secondMark",
  pendingVerification = "pendingVerification",
  sold = "sold",
  soldOnClearance = "soldOnClearance",
  unsold = "unsold",
}

export enum ProductStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export enum productsStatusColorEnum {
  GRIS = "GRIS",
  ROJO = "ROJO",
  AMARILLO = "AMARILLO",
  AZUL = "AZUL",
  CELESTE = "CELESTE",
  BLANCO = "BLANCO",
  VERDE = "VERDE",
}

export interface IProfileContact {
  formikUser: any;
  getPropsSeller: (name: string) => IInputProps;
  getPropsUser: (name: string) => IInputProps;
  formikSeller: any;
  edit?: boolean;
}

export interface IProduct {
  brand: string;
  description: string;
  price: number;
  size: string;
  photoUrl: string;
}

export interface IProfilePayments {
  getPropsSellerPayments: (name: string) => IInputProps;
  formikSellerPayments: any;
  editSeller?: boolean;
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

export interface IForgotFormErrors {
  email?: string;
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

export interface IDashboardSellerPayments {
  phone: string;
  address: string;
  bank_account: string;
  social_media: string;
}

export interface ISeller {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  bank_account: string;
  social_media: string;
  id: string;
}

export interface IInputProps {
  label?: string;
  formType?: formTypeEnum;
  value?: any;
  userType?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  errors?: string;
  disabledUnique?: boolean;
  disabled?: boolean;
  edit?: boolean;
  missingFields?: string[];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ProductProps {
  id: number;
  brand: string;
  description: string;
  price: number;
  size: string;
  photoUrl: string;
  liquidation: boolean;
  category: string;
}

export interface IForgot {
  email: string;
}

export interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
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
  category: {
    name: string;
    id?: string;
  };
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

export interface SellerRegistrations {
  categoryFair: Category;
  entryfee: number;
  id: string;
  registrationDate: string;
  seller: ISeller;
}

export interface UserRegistrations {
  entryfee: number;
  id: string;
  registrationDate: string;
  registrationDay: string;
  registrationHour: string;
}

export interface IFair {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  entryPriceSeller: number;
  entryPriceBuyer: number;
  entryDescription: string;
  fairCategories: FairCategories[];
  fairDays: FairDay[];
  sellerRegistrations: SellerRegistrations[];
  userRegistrations: UserRegistrations[];
}

export interface IFairContainer {
  fair: IFair;
}

export interface IFairContext {
  fairs: IFair[];
  activeFair?: IFair;
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
  registration_date: Date;
  role: string;
  statusGeneral?: statusGeneralEnum;
  seller?: ISeller;
  registrations?: [PaymentsUserProps];
}

export interface PaymentsSellerProps {
  fairId: string | undefined;
  categoryId: string | undefined;
  userId?: string | undefined;
  handleBuy: () => void;
  className: string;
  disabled: boolean;
  fair?: IFair;
  categoryFair?: Category;
}

export interface PaymentsUserProps {
  id?: string;
  userId: string | undefined;
  fairId: string | undefined;
  registrationHour: string | null | undefined;
  registrationDay: string | null | undefined;
  handleBuy: () => void;
  className: string;
  disabled: boolean;
  fair?: IFair;
}

export interface ModalProps {
  onCloseModal: () => void;
  message: string;
  className?: string;
  buttonApprove?: ReactNode;
  buttonCancel?: ReactNode;
}

export interface TicketProps {
  name: string | null | [];
  salesChecked?: string;
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
  sellerDtos: ISeller | null;
  setSellerDtos: React.Dispatch<React.SetStateAction<ISeller | null>>;
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

export interface IPasswordChangeForgot {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IPasswordChangeForgotErrors {
  current_password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
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

export interface ForgotPasswordProps {
  params: {
    token: string;
  };
}

export interface IForgotPasswordProps {
  token: string;
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
  value?: string | [];
  placeholder?: string;
  bg?: string;
};

export interface ISidebarProps {
  userRole?: string;
}

export interface IDashboardCardProps {
  title: string;
  typeEnum: dashboardEnum;
  description: string;
  message?: string | null;
}

export interface UniqueData {
  userInfo: UserDto[];
  sellerInfo: ISeller[];
}
export interface Column {
  id: string;
  label: string;
  sortable: boolean;
}

export interface IDataTableProps {
  columns?: Column[];
  state?: DropdownOption;
  profiles?: DropdownOption;
  usersFiltered?: UserDto[];
  trigger: boolean;
  setTrigger: (newValue: boolean) => void;
}
export interface IProductRequestTableProps {
  columns?: Column[];
  detailColumns?: Column[];
  state?: DropdownOption;
  profiles?: DropdownOption;
  productRequest: Notification[];
  trigger: boolean;
  activeFair?: IFair;
  setTrigger: (newValue: boolean) => void;
}

export interface RowProps {
  column: Column;
  data?: any;
}

export interface BadgeProps {
  type?: statusGeneralEnum | productsStatusEnum;
}

export interface SearchbarProps {
  users: UserDto[];
  setUsersFiltered: (users: UserDto[]) => void;
}

export interface ExcelDataProfiles {
  SKU: string;
  Rol?: string;
  Nombre: string;
  FechaAlta: string;
  Estado?: statusGeneralEnum;
}

export interface ISellerNotification {
  id: string;
  bank_account: string;
  social_media: string;
  phone: string;
  address: string;
  sku: string;
  status: statusGeneralEnum;
}

export interface IFairNotification {
  id: string;
  name: string;
  address: string;
  entryPriceSeller: number;
  entryPriceBuyer: number;
  entryDescription: string;
}

export interface IProductNotification {
  id: string;
  brand: string;
  description: string;
  price: number;
  size: string;
  photoUrl: string;
  liquidation: boolean;
  code: string;
  status: productsStatusColorEnum;
  category: string;
}

export interface Notification {
  id: string;
  category: string;
  status: ProductStatus;
  seller: ISellerNotification;
  fair: IFairNotification;
  products: IProductNotification[];
  message: string;

}

export interface WebSocketNotification {
  id: string;
  category: string;
  status: ProductStatus;
  seller: ISellerNotification;
  fair: IFairNotification;
  product: {
    pRequestId: string;
    sellerId: string;
    status: productsStatusColorEnum;
  };
  message: string;
}

export interface NotificationFromBack {
  message: string;
  id: string;
  category: string;
  sellerId: string;
  pRequestId: string;
  status: productsStatusColorEnum;
}

export interface handleSelectProps {
  role: string;
  id: string;
}

export interface LoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface SelectedOption {
  name: string;
}
