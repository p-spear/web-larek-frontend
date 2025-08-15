export interface IProduct {
  id: string;
  category: string;
  image: string;
  price: number;
  title: string;
  description:string;
}

export interface IUser {
	paymentMethod: string;
	address: string;
	email: string;
	phone: string;
}

export interface ICatalogModel {
  items: IProduct[];
  preview: string | null;
  setItems(items: IProduct[]): void;
  getProduct(id: string): IProduct;
}

export type TProductCatalogInfo = Pick<IProduct, 'category' | 'image' | 'price' | 'title'>;

export type TProductBasketInfo = Pick<IProduct, 'title' | 'price'>;

export type TUserPaymentInfo = Pick<IUser, 'paymentMethod' | 'address'>;

export type TUserContactInfo = Pick<IUser, 'email' | 'phone'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}