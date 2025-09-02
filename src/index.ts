import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL,AppEvents,buttonSettings,CDN_URL, containers, templates } from './utils/constants';
import { ProductsData } from './components/Model/ProductsData';
import { UserData } from './components/Model/UserData';
import { AppApi } from './components/AppApi';
import { CardProduct } from './components/View/CardProduct';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/View/Page';
import { CardCatalog } from './components/View/CardCatalog';
import { CardBasket } from './components/View/CardBasket';
import { BasketData } from './components/Model/BasketData';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Order } from './components/View/Order';
import { IContactsForm, IOrderForm, IUser, TOrderData } from './types';
import { Contacts } from './components/View/Contacts';
import { OrderSuccess } from './components/View/OrderSuccess';

const events = new EventEmitter();
const api = new AppApi(API_URL, CDN_URL);

const productsData = new ProductsData(events);
const userData = new UserData(events);
const basketData = new BasketData(events);

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(templates.cardCatalog);
const cardProductTemplate = ensureElement<HTMLTemplateElement>(templates.cardProduct);
const cardBasketTemplate = ensureElement<HTMLTemplateElement>(templates.cardBasket);
const basketTemplate = ensureElement<HTMLTemplateElement>(templates.basket);
const orderTemplate = ensureElement<HTMLTemplateElement>(templates.order);
const contactsTemplate = ensureElement<HTMLTemplateElement>(templates.contacts);
const successTemplate = ensureElement<HTMLTemplateElement>(templates.success);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>(containers.modal), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
    onClick: (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      order.onInputChange('payment', target.name);
      }
    });
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

api.getProducts()
  .then((products) => {productsData.setItems(products);
  events.emit(AppEvents.view.cardsLoad);
  })
  .catch(err => {
    console.error(err);
  });

events.on(AppEvents.view.cardsLoad, () => {
  const cardArray = productsData.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
    return card.render(item);
  });
  page.render({catalog: cardArray});
});

events.on(AppEvents.view.cardSelect, (item: {card: CardCatalog}) => {
  let inBasket = basketData.inBasket(item.card.id);
  const card = new CardProduct(cloneTemplate(cardProductTemplate), events, {
    onClick: () => {
        if(inBasket) {
          events.emit(AppEvents.view.basketRemove, { card: card })
          inBasket = false;
          card.buyButton = buttonSettings.buy;
        } else {
          events.emit(AppEvents.view.basketAdd, { card: card });
          inBasket = true;
          card.buyButton = buttonSettings.deleteFromBasket;
        }
      }
    });
  card.buyButton = inBasket ? buttonSettings.deleteFromBasket : buttonSettings.buy;
  const product  = productsData.getProduct(item.card.id);
  modal.render({
    content: card.render({
      category: product.category,
      image: product.image,
      price: product.price,
      title: product.title,
      description: product.description,
      id: product.id
    })
  })
});

events.on(AppEvents.model.basketChanged, () => {
  const purchaseArray = basketData.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), events);
    card.setIndex(index + 1);
    return card.render(item);
  });
  basket.render({items: purchaseArray})
  page.counter = basketData.countItems();
  basket.total = basketData.getTotalCost();
});

events.on(AppEvents.view.basketAdd, (item: {card: CardProduct}) => {
  const purchase  = productsData.getProduct(item.card.id);
  basketData.add(purchase);
});

events.on(AppEvents.view.basketRemove, (item: {card: CardProduct}) => {
  basketData.remove(item.card.id);
});

events.on(AppEvents.view.basketOpen, () => {
  const purchaseArray = basketData.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), events);
    card.setIndex(index + 1);
    return card.render(item);
  });
  
  modal.render({content: 
    basket.render({items: purchaseArray})
  })
});

events.on(AppEvents.view.basketSubmit, () => {
  const orderData: IOrderForm = userData.getUserInfo();
  const {payment, address} = orderData;
  modal.render({content: 
    order.render({
      payment: payment,
      address: address,
      valid: (payment && address) ? true: false,
      errors: []
    })
  })
});

events.on(AppEvents.model.inputChange, (data: { field: keyof IUser, value: string }) => {
  userData.setUserInfo(data.field, data.value);
});

events.on('change: payment', (data: {value: string}) => {
  order.setPayment(data.value);
});

events.on(AppEvents.view.orderFormErrorsChange, (errors: Partial<IOrderForm>) => {
  const {payment, address} = errors;
  order.valid = !payment && !address;
  order.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
});

events.on(AppEvents.view.orderSubmit, () => {
  const contactsData: IContactsForm = userData.getUserInfo();
  const {email, phone} = contactsData;
  modal.render({content: 
    contacts.render({
      email: email,
      phone: phone,
      valid: (email && phone) ? true: false,
      errors: []
    })
  })
});

events.on(AppEvents.view.contactsFormErrorsChange, (errors: Partial<IContactsForm>) => {
  const {email, phone} = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

events.on(AppEvents.model.contactsSubmit, () => {
  const orderData: TOrderData = Object.assign(userData.getUserInfo(), basketData.getOrderData());
  api.sendOrder(orderData)
    .then((result) => {
      const success = new OrderSuccess(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
        }
      });
      basketData.clearBasket();
      
      userData.clearData();
      order.clearPayment();

      modal.render({
        content: success.render({total: result.total})
      });
    })
    .catch(err => {
      console.error(err);
    });
});

events.on(AppEvents.view.modalOpen, () => {
  page.locked = true;
});

events.on(AppEvents.view.modalClose, () => {
  page.locked = false;
});
