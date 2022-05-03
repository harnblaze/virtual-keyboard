import Button from '../Button/Button';
import Control from '../Control/Control';
import TextArea from '../TextArea/TextArea';

export default class App extends Control {
  constructor() {
    super(document.body, 'div', 'app');
    this.text = '';
    this.lang = 'en';
  }

  async start() {
    this.textArea = new TextArea(this.node, this.text, this.changeText);
    const res = await fetch('../json/buttons.json');
    const buttons = await res.json();
    this.buttons = buttons.map(
      (button) => new Button(this.node, button, this.clickButton),
    );
    this.buttonLang = new Button(
      this.node,
      {
        ru: {
          char: 'ru',
        },
        en: {
          char: 'en',
        },
      },
      this.changeLang,
    );
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
    this.buttons.forEach((button) => {
      button.changeLang(this.lang);
    });
    this.buttonLang.node.innerText = this.lang;
  };
}
