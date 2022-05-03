import Control from '../Control/Control';

export default class Button extends Control {
  constructor(parent, options, clickButton) {
    super(parent, 'button', 'button');
    this.options = options;
    this.lang = 'en';
    this.node.innerText = this.options.en.char;
    this.node.onclick = (e) => {
      clickButton(e.target.innerText);
    };
  }

  changeLang(lang) {
    this.lang = lang;
    this.node.innerText = this.options[lang].char;
  }
}
