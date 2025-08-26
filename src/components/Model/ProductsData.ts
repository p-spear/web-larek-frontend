import { IProduct, ICatalogData } from "../../types";
import { AppEvents } from "../../utils/constants";
import { IEvents } from "../base/events";

export class ProductsData implements ICatalogData {
  protected catalog: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
    this.catalog = [];
  }

  setItems(items: IProduct[]) {
    this.catalog = items;
    this.events.emit(AppEvents.view.cardsLoad);
  }

  getItems():IProduct[] {
    return this.catalog;
  }

  getProduct(itemId: string): IProduct {
    return this.catalog.find(item => item.id === itemId);
  }
}