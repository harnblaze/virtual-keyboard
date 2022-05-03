export default class Control {
  constructor(parent, tag, className) {
    const el = document.createElement(tag);
    parent.append(el);
    el.classList.add(className);
    this.node = el;
  }

  destroy() {
    this.node.remove();
  }
}
