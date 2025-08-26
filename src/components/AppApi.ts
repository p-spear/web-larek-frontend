import { Api, ApiListResponse } from "./base/api";
import { IProduct, TOrderData, IOrderResult } from "../types";

export class AppApi extends Api {
  readonly cdn: string;

  constructor(baseUrl: string, cdn: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

	getProducts(): Promise<IProduct[]> {
		return this.get('/product/')
    .then((result: ApiListResponse<IProduct>) => 
      result.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );
	}

  sendOrder(data: TOrderData): Promise<IOrderResult> {
    return this.post<IOrderResult>('/order', data)
    .then((result: IOrderResult) => result)
  }
}