import Control from '../Control/Control';

export default class TextArea extends Control {
  constructor(parent, text, onChange) {
    super(parent, 'textarea', 'textarea');
    this.node.setAttribute('cols', 50);
    this.node.setAttribute('rows', 10);
    this.node.value = text;
    this.node.oninput = (e) => {
      onChange(e.target.value);
    };
  }
}
