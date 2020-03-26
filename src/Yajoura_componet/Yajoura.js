"use strict";
export class yajouraComponent extends HTMLElement {
  constructor(selector) {
    super();
    if (selector !== false) {
      this.shadow = this.attachShadow({ mode: "open" });
      this.loadDom(selector);
      this.loadStyle(selector);
    }
  }
  async loadDom(selector) {
    await fetch(selector.HtmlSelector[0])
      .then(html => html.text())
      .then(dom => {
        this.shadow.innerHTML = dom;
      });
  }
  loadStyle(selector) {
    fetch(selector.CssSelector[0])
      .then(css => css.text())
      .then(style => {
        let Style = document.createElement('style');
        Style.textContent = style;
        this.shadow.appendChild(Style);
      });
  }
}
export const defineComponent = (component, name) => {
  try {
    customElements.define(name, component);
  } catch (err) {
    throw err;
  }
};
export const defineAllComponent = routes => {
  if (routes.length > -1) {
    routes.map(route => {
      if (route.children) {
        defineAllComponent(route.children);
      }
      defineComponent(route.component, route.selector.Componentselector[0]);
    });
  }
};
