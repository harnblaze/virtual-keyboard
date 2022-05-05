import Control from '../Control/Control';

export default class TextArea extends Control {
  constructor(parent, text, onChange) {
    super(parent, 'textarea', 'textarea');
    this.node.setAttribute('cols', 75);
    this.node.setAttribute('rows', 10);
    this.node.value = text;
    this.node.oninput = () => {
      onChange(this.node.value);
    };
  }
}
