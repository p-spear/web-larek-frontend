export interface IProduct {
  id: string;
  category: string;
  image: string;
  price: number;
  title: string;
  description:string;
}

export interface IUser {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface ICatalogData {
  setItems(items: IProduct[]): void;
  getProduct(itemId: string): IProduct;
}

export interface IOrderForm {
    payment: string;
    address: string;
}

export interface IContactsForm {
    email: string;
    phone: string;
}

export interface IOrderBasketData {
  total: number; 
  items: string[];
}

export interface IOrderResult  {
  id: string, 
  total: number
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type OrderFormErrors = Partial<Record<keyof IOrderForm, string>>;

export type ContactsFormErrors = Partial<Record<keyof IContactsForm, string>>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TOrderData = IUser & IOrderBasketData;