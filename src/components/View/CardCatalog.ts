import { IProduct } from "../../types";
import { AppEvents, cardCategory, currencySettings } from "../../utils/constants";
import { ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class CardCatalog extends Component<IProduct> {
  protected events: IEvents;
  protected _category: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLSpanElement;
  protected _title: HTMLHeadingElement;
  protected cardId: string;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);

    this.container.addEventListener('click', () =>
      this.events.emit(AppEvents.view.cardSelect, { card: this })
    );
  }

  set title(value: string){
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set category(value: string){
    this.setText(this._category, value);
    const classCardCategory: string = Object.keys(cardCategory).find(key => cardCategory[key as keyof typeof cardCategory] === value);
    this._category.className = `card__category ${classCardCategory}`;
    //console.log(this._category.className);
    //this._category.classList.remove('card__category_soft');
    //this._category.classList.add(classCardCategory);
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set price(value: number){
    this.setText(this._price, value ? formatNumber(value) + currencySettings.currency : currencySettings.priceless);
  }

	set id(id) {
		this.cardId = id;
	}

	get id() {
		return this.cardId;
	}
}