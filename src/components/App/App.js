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
    this.isShiftClick = false;
    this.buttons = [];
  }

  async start() {
    this.textArea = new TextArea(this.node, this.text, this.changeText);
    this.textArea.node.focus();
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
    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.onKeyDown(e.code);
    });
    document.body.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.onKeyUp(e.code);
    });
  }

  clickButton = (type, char) => {
    if (type === 'letter') {
      if (this.isShiftClick) {
        this.clickShift();
      }
      this.text += char;
      this.updateText();
    } else if (type === 'capsLock') {
      this.changeCapsLock();
    } else if (type === 'langButton') {
      this.changeLang();
    } else if (type === 'shift') {
      this.clickShift();
    } else if (type === 'tab') {
      this.clickTab();
    } else if (type === 'backspace') {
      this.clickBackspace();
    } else if (type === 'enter') {
      this.clickEnter();
    }
  };

  updateText = () => {
    this.textArea.node.value = this.text;
  };

  changeLang = () => {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.buttons.forEach((button) => {
      button.updateTextButton(this.lang, this.isCaps, this.isShift);
    });
  };

  changeCapsLock = () => {
    this.isCaps = !this.isCaps;
    this.buttons
      .find((button) => button.dataButton.type === 'capsLock')
      .node.classList.toggle('button-active');
    this.buttons.forEach((button) => {
      button.updateTextButton(this.lang, this.isCaps, this.isShift);
    });
  };

  clickShift = () => {
    this.isShift = !this.isShift;
    this.isShiftClick = !this.isShiftClick;
    this.buttons
      .find((button) => button.dataButton.type === 'shift')
      .node.classList.toggle('button-active');
    this.buttons.forEach((button) => {
      button.updateTextButton(this.lang, this.isCaps, this.isShift);
    });
  };

  keyDownShift = (isShift) => {
    this.isShift = isShift;
    this.buttons.forEach((button) => {
      button.updateTextButton(this.lang, this.isCaps, this.isShift);
    });
  };

  clickTab = () => {
    this.text += '\t';
    this.updateText();
  };

  clickEnter = () => {
    this.text += '\n';
    this.updateText();
  };

  clickBackspace = () => {
    this.text = this.text.slice(0, -1);
    this.updateText();
  };

  onKeyDown = (code) => {
    const key = this.buttons.find((button) => button.dataButton.key === code);
    if (key) {
      if (key.dataButton.type === 'capsLock') {
        this.clickButton(key.dataButton.type, key.text);
      } else if (!(key.dataButton.type === 'shift')) {
        this.clickButton(key.dataButton.type, key.text);
        key.node.classList.add('button-active');
      } else {
        key.node.classList.toggle('button-active');
        this.keyDownShift(true);
      }
    }
  };

  onKeyUp = (code) => {
    const key = this.buttons.find((button) => button.dataButton.key === code);
    if (key && !(key.dataButton.type === 'capsLock')) {
      if (key.dataButton.type === 'shift') {
        key.node.classList.toggle('button-active');
        this.isShift = false;
        this.keyDownShift(false);
      } else {
        key.node.classList.remove('button-active');
      }
    }
  };
}
