import { IProduct } from "../../types";
import { AppEvents, buttonSettings, currencySettings } from "../../utils/constants";
import { ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class CardProduct extends Component<IProduct> {
  protected events: IEvents;
  protected _category: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLSpanElement;
  protected _title: HTMLHeadingElement;
  protected _description: HTMLParagraphElement;
  protected cardId: string;
  protected buyButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, events: IEvents, inBasket: boolean) {
    super(container);
    this.events = events;
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._description = ensureElement<HTMLParagraphElement>('.card__text', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    this.buyButton = ensureElement<HTMLButtonElement>('.card__button', container);
    
    this.setText(this.buyButton, inBasket ? buttonSettings.deleteFromBasket : buttonSettings.buy);

    this.buyButton.addEventListener('click', () => {
      if(inBasket) {
        this.setText(this.buyButton, buttonSettings.buy);
        this.events.emit(AppEvents.model.basketRemove, { card: this })
        inBasket = false;
      } else {
        this.setText(this.buyButton, buttonSettings.deleteFromBasket);
        this.events.emit(AppEvents.model.basketAdd, { card: this });
        inBasket = true;
      }
    });
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
    this.buyButton.textContent = isValid ? this.buyButton.textContent: buttonSettings.notAvailable;
		this.buyButton.disabled = !isValid;
	}
}