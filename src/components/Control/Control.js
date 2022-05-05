export default class Control {
  constructor(parent, tag, className) {
    const el = document.createElement(tag);
    parent.append(el);
    el.className = className;
    this.node = el;
  }

  destroy() {
    this.node.remove();
  }
}
