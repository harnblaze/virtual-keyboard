import Control from '../Control/Control';

export default class Button extends Control {
  constructor(parent, dataButton, lang, clickButton) {
    super(parent, 'button', `button ${dataButton.type}-button`);
    this.dataButton = dataButton;
    this.text = dataButton[lang].char;
    this.node.onclick = () => {
      clickButton(this.dataButton.type, this.text);
    };
    this.updateTextButton(lang, false, false);
  }

  updateTextButton(lang, capsLock, shift) {
    if (capsLock) {
      this.text = this.dataButton[lang].capsLock;
    }
    if (shift) {
      this.text = this.dataButton[lang].shift;
    }
    if (capsLock && shift) {
      this.text = this.dataButton[lang].capsLockShift;
    }
    if (!capsLock && !shift) {
      this.text = this.dataButton[lang].char;
    }
    this.node.textContent = this.text;
  }
}
