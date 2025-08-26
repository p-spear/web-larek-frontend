import { currencySettings } from "../../utils/constants";
import { ensureElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccess {
  total: number;
}

interface ISuccessActions {
  onClick: () => void;
}

export class OrderSuccess extends Component<ISuccess> {
  protected _close: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._close = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this._total = ensureElement<HTMLParagraphElement>('.order-success__description', this.container);
    
    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${formatNumber(value)}${currencySettings.currency}`);
  }
}