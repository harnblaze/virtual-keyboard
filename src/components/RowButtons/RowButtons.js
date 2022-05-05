import Control from '../Control/Control';
import Button from '../Button/Button';

export default class RowButtons extends Control {
  constructor(parent, dataButtons, lang, clickButton) {
    super(parent, 'div', 'row');
    this.buttons = dataButtons.map(
      (button) => new Button(this.node, button, lang, clickButton),
    );
  }

  getButtons() {
    return this.buttons;
  }
}
