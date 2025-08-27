import { IProduct } from "../../types";
import { AppEvents, buttonSettings, cardCategory, currencySettings } from "../../utils/constants";
import { ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class CardProduct extends Component<IProduct> {
  protected events: IEvents;
  protected _category: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLSpanElement;
  protected _title: HTMLHeadingElement;
  protected _description: HTMLParagraphElement;
  protected cardId: string;
  protected _buyButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, events: IEvents, actions: ICardActions) {
    super(container);
    this.events = events;
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._description = ensureElement<HTMLParagraphElement>('.card__text', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    this._buyButton = ensureElement<HTMLButtonElement>('.card__button', container);
    
    this._buyButton.addEventListener('click', actions.onClick);
  }

  set buyButton(value: string) {
    this.setText(this._buyButton, value);
  }

  set title(value: string){
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set description(value: string){
    this.setText(this._description, value);
  }

  set category(value: string){
    this.setText(this._category, value);
    const classCardCategory: string = Object.keys(cardCategory).find(key => cardCategory[key as keyof typeof cardCategory] === value);
    this._category.className = `card__category ${classCardCategory}`;
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set price(value: number){
    this.isValid(!!value);
    this.setText(this._price, value ? formatNumber(value) + currencySettings.currency : currencySettings.priceless);
  }

  set id(id) {
		this.cardId = id;
	}

	get id() {
		return this.cardId;
	}
  
  isValid(isValid: boolean) {
    this._buyButton.textContent = isValid ? this._buyButton.textContent: buttonSettings.notAvailable;
		this._buyButton.disabled = !isValid;
	}
}