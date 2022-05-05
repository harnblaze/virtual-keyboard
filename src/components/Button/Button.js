import Control from '../Control/Control';

export default class Button extends Control {
  constructor(parent, dataButton, lang, clickButton) {
    super(parent, 'button', `button ${dataButton.type}-button`);
    this.dataButton = dataButton;
    this.lang = lang;
    this.isCapsLock = false;
    this.text = dataButton[lang].char;
    this.node.onclick = () => {
      clickButton(this.dataButton.type, this.text);
    };
    this.updateText();
  }

  updateText() {
    if (this.isCapsLock) {
      this.text = this.dataButton[this.lang].capsLock;
    } else {
      this.text = this.dataButton[this.lang].char;
    }
    this.node.textContent = this.text;
  }

  changeLang(lang) {
    this.lang = lang;
    this.updateText();
  }

  clickCapsLock(capsLock) {
    this.isCapsLock = capsLock;
    this.updateText();
  }
}
