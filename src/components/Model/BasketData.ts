import { IOrderBasketData, IProduct } from "../../types";
import { AppEvents } from "../../utils/constants";
import { isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";

export class BasketData {
  protected _items: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this._items = [];
  }

  getItems(): IProduct[] {
    return this._items;
  }

  inBasket(cardId: string): boolean {
    return !isEmpty(this._items.find((item) => item.id === cardId));
  }

  add(item: IProduct) {
    this._items = [...this._items, item];
    this.events.emit(AppEvents.view.basketChanged);
  }

  remove(id: string) {
    this._items = this._items.filter(item => item.id !== id);
    this.events.emit(AppEvents.view.basketChanged);
  }

  getTotalCost(): number {
    return this._items.reduce((sum, item) => sum + item.price, 0);
  }

  countItems(): number {
    return this._items.length;
  }

  getOrderData(): IOrderBasketData {
    const itemsId = this.getItems().map((item) => {
      return item.id;
    });
    return {total: this.getTotalCost(), items: itemsId}
  }

  clearBasket() {
    this._items = [];
  }
}