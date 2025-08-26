import { IOrderForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

export class Order extends Form<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.cardButton = ensureElement<HTMLButtonElement>("[name='card']", container);
    this.cashButton = ensureElement<HTMLButtonElement>("[name='cash']", container);

    const buttons = container.querySelectorAll('.button');

    this.cardButton.addEventListener('click', (event) => {
      const target = event.target as HTMLInputElement;
      this.setPayment(buttons, target);
    });
    this.cashButton.addEventListener('click', (event) => {
      const target = event.target as HTMLInputElement;
      this.setPayment(buttons, target);
    });
  }
  
  protected setPayment(buttons: NodeListOf<Element>, target: HTMLInputElement) {
    buttons.forEach(button => {
      button.classList.remove('button_alt-active');
    })
    if(target) {
      target.classList.add('button_alt-active');
      const value = target.name;
      this.onInputChange('payment', value);
    }
  }

  clearPayment():void {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
  } 

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}