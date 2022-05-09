import Control from '../Control/Control';

export default class Description extends Control {
  constructor(parent) {
    super(parent, 'div', 'description');
    this.node.innerHTML = `
      <p>Переключение языка по клавишам Ctrl+Alt и по кнопке на виртуальной клавиатуре рядом со стрелками.</p> 
      <p>Разработано в системе Linux.</p>`;
  }
}
