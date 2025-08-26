import { AppEvents, currencySettings } from "../../utils/constants";
import { createElement, ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._list = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this.submitButton = this.container.querySelector('.basket__button');

    if (this.submitButton) {
      this.submitButton.addEventListener('click', () => {
        events.emit(AppEvents.view.basketSubmit);
      });
    }

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
      this.setDisabled(this.submitButton, false);
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста'
      }));
      this.setDisabled(this.submitButton, true);
    }
  }

  set total(total: number) {
    this.setText(this._total, formatNumber(total) + currencySettings.currency);
  }
}