import Control from '../Control/Control';

export default class ColorButton extends Control {
  constructor(parent, name, clickButton) {
    super(parent, 'button', 'button color-button');
    this.node.textContent = name;
    this.node.onclick = () => {
      clickButton();
    };
  }
}
