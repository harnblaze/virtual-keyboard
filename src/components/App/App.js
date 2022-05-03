import Button from '../Button/Button';
import Control from '../Control/Control';
import TextArea from '../TextArea/TextArea';

export default class App extends Control {
  constructor() {
    super(document.body, 'div', 'app');
    this.text = '';
    this.lang = 'en';
    this.isCaps = false;
  }

  async start() {
    this.textArea = new TextArea(this.node, this.text, this.changeText);
    const res = await fetch('../json/buttons.json');
    const buttons = await res.json();
    this.letterButtons = buttons.letters.map(
      (button) => new Button(this.node, button, this.lang, this.clickButton),
    );

    this.langButton = new Button(
      this.node,
      buttons.langButton,
      this.lang,
      this.changeLang,
    );
    this.langButton.node.classList.add('lang__button');

    this.capsLockButton = new Button(
      this.node,
      buttons.capsLock,
      this.lang,
      this.changeCapsLock,
    );
    this.capsLockButton.node.classList.add('caps__button');
  }

  changeText = (value) => {
    this.text = value;
  };

  clickButton = (char) => {
    this.text += char;
    this.updateText();
  };

  updateText = () => {
    this.textArea.node.value = this.text;
  };

  changeLang = () => {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.letterButtons.forEach((button) => {
      button.changeLang(this.lang);
    });
    this.langButton.node.innerText = this.lang;
  };

  changeCapsLock = () => {
    this.isCaps = !this.isCaps;
    this.letterButtons.forEach((button) => {
      button.clickCapsLock(this.isCaps);
    });
  };
}
