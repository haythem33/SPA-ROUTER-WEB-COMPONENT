"use strict";

import { routes } from "./router.config";

export class Router extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open"});
    window.addEventListener("load", () => {
      this.path = this.getPath();
      this.component = this.getComponentPath(this.path, routes);
      this.paramsComponent = this.findParams(this.component,routes);
      window.addEventListener("hashchange", () => {
        this.path = this.getPath();
        this.component = this.getComponentPath(this.path,routes);
        this.paramsComponent = this.findParams(this.component,routes);
      });
    });
  }
  getPath() {
    return location.hash.slice(1).toLowerCase() || "/";
  }
  getComponentPath(path) {
    let component = [];
    let HashPath = "";
    for (let i = 1; i <= path.length; i++) {
      if (path[i] === "/" || i === path.length) {
        component.push(HashPath);
        HashPath = "";
      } else {
        HashPath += path[i];
      }
    }
    return component;
  }
  findParams(component, routes) {
    let state = true;
    let error;
    if (component.length > 0) {
      let slash = `/${component[0]}` || "/";
      let initComponent = this.clearPath(slash, routes);
      if (initComponent !== undefined) {
        let params =
          initComponent.find(r => r.path.match("/:params")) || undefined;
        if (params !== undefined) {
          let NumParams = this.countParams(params.path);
          if (NumParams > 0) {
            let ParamsValue = [];
            if (component.length > NumParams) {
              for (let j = 0; j < NumParams; j++) {
                ParamsValue.push(component[1]);
                component.splice(0, 1);
              }
              component[0] = {
                path: slash,
                paramsNum: NumParams,
                paramsValue: ParamsValue
              };
            } else {
              state = false;
              error = {
                error: `you have to give ${NumParams} paramater for this component`,
                statut: 400
              };
            }
          }
        } else {
          component[0] = { path: slash, paramsNum: 0, paramsValue: null };
        }
      } else {
        state = false;
        error = {
          error: `no component given for this component : /${component[0]}`,
          statut: 404
        };
      }
      if (
        state &&
        initComponent[0].children !== undefined &&
        component.length > 1
      ) {
        for (let i = 1; i < component.length; i++) {
          slash = `/${component[i]}` || "/";
          initComponent = this.clearPath(slash, initComponent[0].children);
          if (initComponent !== undefined && state) {
            let params =
              initComponent.find(r => r.path.match("/:params")) || undefined;
            if (params !== undefined) {
              let NumParams = this.countParams(params.path);
              if (NumParams > 0) {
                let paramsValue = [];
                if (component.length > i + NumParams) {
                  for (let j = 0; j < NumParams; j++) {
                    paramsValue.push(component[i + 1]);
                    component.splice(i, 1);
                  }
                  component[i] = {
                    path: slash,
                    paramsNum: NumParams,
                    paramsValue: paramsValue
                  };
                } else {
                  state = false;
                  error = {
                    error: `you have to give ${NumParams} paramater for this component`,
                    statut: 400
                  };
                  break;
                }
              }
            } else {
              component[i] = { path: slash, paramsNum: 0, paramsValue: null };
            }
          } else {
            state = false;
            error = {
              error: `no component given for this component : /${component[i]}`,
              statut: 404
            };
            break;
          }
        }
      }
    }
    if (state) {
      this.addComponentDom(component, routes);
      return component;
    } else {
      console.error(error.statut + "\n" + error.error);
      return undefined;
    }
  }
  addComponentDom(component, routes) {
    if (component !== undefined && component.length > 0) {
      let slash = component[0].path || "/";
      let initComponent = this.clearPath(slash, routes);
      if (initComponent !== undefined) {
        this.getComponentDom(initComponent[0], false);
        if (component.length > 1) {
          for (let i = 1; i < component.length; i++) {
            slash = component[i].path || "/";
            initComponent = this.clearPath(slash, initComponent[0].children);
            if (initComponent !== undefined) {
              this.getComponentDom(initComponent[0], true);
            } else {
              console.error("no component for this path 1 in addComponent ");
              break;
            }
          }
        }
      } else {
        console.error("No component for this path 2 in add Component");
      }
    }
  }
  getComponentDom(component, children) {
    if (component !== undefined) {
      fetch(component.selector.HtmlSelector[0])
        .then(html => html.text())
        .then(dom => {
          fetch(component.selector.CssSelector[0])
            .then(css => css.text())
            .then(css => {
              if (children) {
                if (this.childRoot !== undefined) {
                  this.childRoot.innerHTML = dom;
                  let style = document.createElement("style");
                  style.textContent = css;
                  this.childRoot.appendChild(style);
                  if (this.childRoot.querySelector("yajoura-router")) {
                    this.childRoot =
                      this.childRoot.querySelector("yajoura-router")
                        .shadowRoot || undefined;
                  }
                }
              } else {
                
                this.shadow.innerHTML = dom;
                let style = document.createElement("style");
                style.textContent = css;
                this.shadow.appendChild(style);
                new component.component();
                if (this.shadow.querySelector("yajoura-router")) {
                  this.childRoot =
                    this.shadow.querySelector("yajoura-router").shadowRoot ||
                    undefined;
                }
              }
            });
        });
    } else {
      console.error("No component find for this path");
    }
  }
  countParams(path) {
    let NumParams = 0;
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "/" && path[i + 1] === ":") {
        NumParams++;
      }
    }
    return NumParams;
  }
  clearPath(path, route) {
    if (route !== undefined) {
      let component = [];
      route.map((c, l) => {
        let realPath = "/";
        for (let i = 0; i < c.path.length; i++) {
          if (c.path[i] !== ":") {
            if (i > 0 && c.path[i] !== "/") {
              realPath += c.path[i];
            }
          } else {
            break;
          }
        }
        if (path === realPath) {
          component.push(c);
        }
      });
      if (component.length > 0) {
        return component;
      } else {
        return undefined;
      }
    }
  }

}