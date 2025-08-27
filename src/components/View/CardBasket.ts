import { IProduct } from "../../types";
import { AppEvents, currencySettings } from "../../utils/constants";
import { ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class CardBasket extends Component<IProduct> {
  protected events: IEvents;
  protected _index: HTMLSpanElement;
  protected _price: HTMLSpanElement;
  protected _title: HTMLHeadingElement;
  protected deleteButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.deleteButton.addEventListener('click', () =>
      this.events.emit(AppEvents.view.basketRemove, { card: this })
    );
  }

  setIndex(value: number){
    this.setText(this._index, value);
  }

  set title(value: string){
    this.setText(this._title, value);
  }

  set price(value: number){
    this.setText(this._price, formatNumber(value) + currencySettings.currency);
  }
}