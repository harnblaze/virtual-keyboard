import Control from '../Control/Control';

export default class Button extends Control {
  constructor(parent, options, lang, clickButton) {
    super(parent, 'button', 'button');
    this.options = options;
    this.lang = lang;
    this.isCapsLock = false;
    this.text = this.options[lang].char;
    this.node.onclick = () => {
      clickButton(this.node.innerText);
    };
    this.updateText();
  }

  updateText() {
    this.text = this.isCapsLock
      ? this.options[this.lang].capsLock
      : this.options[this.lang].char;
    this.node.innerText = this.text;
  }

  changeLang(lang) {
    this.lang = lang;
    this.updateText();
  }

  clickCapsLock() {
    this.isCapsLock = !this.isCapsLock;
    this.updateText();
  }
}
