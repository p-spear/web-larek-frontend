export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const buttonSettings = {
  buy: 'Купить',
  deleteFromBasket: 'Удалить из корзины',
  notAvailable: 'Недоступно'
};

export const currencySettings = {
  currency: ' синапсов',
  priceless: 'Бесценно'
};

export const templates = {
  cardCatalog: '#card-catalog',
  cardProduct: '#card-preview',
  cardBasket: '#card-basket',
  basket: '#basket',
  order: '#order',
  contacts: '#contacts',
  success: '#success'
}

export const containers = {
  modal: '#modal-container',
  catalog: '.gallery'
}

export const AppEvents = {
  model: {
    basketAdd: 'basket:add',
    basketRemove: 'basket:remove',
    inputChange: 'input:change',
    contactsSubmit: 'contacts:submit'
  },
  view: {
    cardsLoad: 'cards:load',
    cardSelect: 'card:select',
    basketOpen: 'basket:open',
    basketChanged: 'basket:changed',
    basketSubmit: 'basket:submit',
    orderSubmit: 'order:submit',
    orderFormErrorsChange: 'orderFormErrors:change',
    contactsFormErrorsChange: 'contactsFormErrors:change',
    modalOpen: 'modal:open',
    modalClose: 'modal:close'
  }
}

export enum textErrors {
  paymentError = 'Необходимо выбрать способ оплаты',
  addressError = 'Необходимо указать адрес доставки',
  emailError = 'Необходимо указать email',
  phoneError = 'Необходимо указать телефон'
}

export const cardCategory = {
  card__category_soft: 'софт-скил',
  card__category_hard: 'хард-скил',
  card__category_other: 'другое',
  card__category_additional: 'дополнительное',
  card__category_button: 'кнопка'
}
