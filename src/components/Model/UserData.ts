import { IUser, OrderFormErrors, ContactsFormErrors } from "../../types";
import { AppEvents, textErrors } from "../../utils/constants";
import { IEvents } from "../base/events";

export class UserData {
  protected payment: string;
	protected address: string;
	protected email: string;
	protected phone: string;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  getUserInfo(): IUser {
    return {payment: this.payment, address: this.address, email: this.email, phone: this.phone};
  }

  setUserInfo(field: keyof IUser, value: string) {
    this[field] = value;
    switch (field) {
			case 'payment':
        this.events.emit('change: payment', {value: value});
        return this.validateOrder();
			case 'address':
				return this.validateOrder();
			case 'email':
      case 'phone':
				return this.validateContacts();
		}
  }

  validateOrder() {
    const errors: OrderFormErrors = {};
    if (!this.payment) {
      errors.payment = textErrors.paymentError;
    }
    if (!this.address) {
      errors.address = textErrors.addressError;
    }
    this.events.emit(AppEvents.view.orderFormErrorsChange, errors);
    return Object.keys(errors).length === 0;
  }

  validateContacts() {
    const errors: ContactsFormErrors = {};
    if (!this.email) {
      errors.email = textErrors.emailError;
    }
    if (!this.phone) {
      errors.phone = textErrors.phoneError;
    }
    this.events.emit(AppEvents.view.contactsFormErrorsChange, errors);
    return Object.keys(errors).length === 0;
  }

  clearData(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
  }
}