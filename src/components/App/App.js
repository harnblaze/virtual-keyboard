import Control from '../Control/Control';
import RowButtons from '../RowButtons/RowButtons';
import TextArea from '../TextArea/TextArea';

export default class App extends Control {
  constructor() {
    super(document.body, 'div', 'app');
    this.text = '';
    this.lang = 'en';
    this.isCaps = false;
    this.isShift = false;
    this.buttons = [];
  }

  async start() {
    this.textArea = new TextArea(this.node, this.text, this.changeText);
    const res = await fetch('../json/buttons.json');
    const rowsButton = await res.json();
    this.rows = rowsButton.map((rowData) => {
      const row = new RowButtons(
        this.node,
        rowData,
        this.lang,
        this.clickButton,
      );
      this.buttons = [...this.buttons, ...row.getButtons()];
      return row;
    });
  }

  clickButton = (type, char) => {
    if (type === 'letter') {
      this.text += char;
      this.updateText();
      if (this.isShift) {
        this.changeShift();
      }
    } else if (type === 'capsLock') {
      this.changeCapsLock();
    } else if (type === 'langButton') {
      this.changeLang();
    } else if (type === 'shift') {
      this.changeShift();
    } else if (type === 'tab') {
      this.clickTab();
    }
  };

  updateText = () => {
    this.textArea.node.value = this.text;
  };

  changeLang = () => {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.buttons.forEach((button) => {
      button.changeLang(this.lang);
    });
  };

  changeCapsLock = () => {
    this.isCaps = !this.isCaps;
    this.buttons.forEach((button) => {
      button.clickCapsLock(this.isCaps);
    });
  };

  changeShift = () => {
    this.isShift = !this.isShift;
    this.buttons.forEach((button) => {
      button.clickShift(this.isShift);
    });
  };

  clickTab = () => {
    this.text += '\t';
    this.updateText();
  };
}
