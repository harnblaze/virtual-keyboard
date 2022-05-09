import ColorButton from '../ColorButton/ColorButton';
import Control from '../Control/Control';
import Description from '../Description/Description';
import RowButtons from '../RowButtons/RowButtons';
import TextArea from '../TextArea/TextArea';

export default class App extends Control {
  constructor() {
    super(document.body, 'div', 'app');
    this.text = localStorage.getItem('area') || '';
    this.lang = localStorage.getItem('lang') || 'en';
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
    this.description = new Description(this.node);
    this.colorButton = new ColorButton(
      this.node,
      'Change color',
      this.changeColorToBlack,
    );
    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();
      if ((e.altKey || e.code === 'AltRight') && e.ctrlKey) {
        this.changeLang();
      }
      this.onKeyDown(e.code);
    });
    document.body.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.onKeyUp(e.code);
    });
  }

  clickButton = (type, char) => {
    if (type === 'letter' || type === 'space' || type === 'arrow') {
      if (this.isShiftClick) {
        this.clickShift();
      }
      const start = this.textArea.node.selectionStart;
      const end = this.textArea.node.selectionEnd;
      this.text = this.text.slice(0, start) + char + this.text.slice(end);
      this.updateText();
      this.textArea.node.selectionEnd = start + 1;
      this.textArea.node.selectionStart = start + 1;
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
    } else if (type === 'delete') {
      this.onDelete();
    }
  };

  updateText = () => {
    this.textArea.node.value = this.text;
    localStorage.setItem('area', this.text);
  };

  changeLang = () => {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', this.lang);
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
    let start = this.textArea.node.selectionStart;
    const end = this.textArea.node.selectionEnd;
    if (start !== end) {
      start += 1;
    }
    this.text = this.text.slice(0, start - 1) + this.text.slice(end);
    this.updateText();
    this.textArea.node.selectionEnd = start - 1;
    this.textArea.node.selectionStart = start - 1;
  };

  onDelete() {
    const start = this.textArea.node.selectionStart;
    const end = this.textArea.node.selectionEnd;
    if (start === end) {
      this.text = this.text.slice(0, start) + this.text.slice(end + 1);
    } else {
      this.text = this.text.slice(0, start) + this.text.slice(end);
    }
    this.updateText();
    this.textArea.node.selectionEnd = start;
    this.textArea.node.selectionStart = start;
  }

  onArrow(key) {
    const pos = this.textArea.node.selectionStart;
    if (key === 'ArrowLeft' && pos !== 0) {
      this.textArea.node.selectionEnd = pos - 1;
      this.textArea.node.selectionStart = pos - 1;
    } else if (key === 'ArrowRight') {
      this.textArea.node.selectionEnd = pos - 1;
      this.textArea.node.selectionStart = pos - 1;
    }
  }

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

  changeColorToBlack = () => {
    document.body.classList.toggle('black');
    this.textArea.node.classList.toggle('black');
    this.buttons.forEach((button) => button.node.classList.toggle('black'));
    this.colorButton.node.classList.toggle('black');
  };
}
