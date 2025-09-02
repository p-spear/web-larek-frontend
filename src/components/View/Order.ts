import { IOrderForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

interface IPaymentActions {
    onClick: (event: MouseEvent) => void;
}

export class Order extends Form<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents, actions: IPaymentActions) {
    super(container, events);
    this.cardButton = ensureElement<HTMLButtonElement>("[name='card']", container);
    this.cashButton = ensureElement<HTMLButtonElement>("[name='cash']", container);

    const buttons:  NodeListOf<Element> = container.querySelectorAll('.button');

    this.cardButton.addEventListener('click', actions.onClick);
    this.cashButton.addEventListener('click', actions.onClick);
  }
  
  setPayment( value: string) {
    this.toggleClass(this.cardButton, 'button_alt-active', value === 'card');
    this.toggleClass(this.cashButton, 'button_alt-active', value === 'cash');
  }

  clearPayment():void {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
  } 

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}