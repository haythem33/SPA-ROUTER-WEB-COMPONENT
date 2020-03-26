import { yajouraComponent } from "../../Yajoura_componet/Yajoura";

let selectorComponent1 = {
    Componentselector: ["component1-component"],
    HtmlSelector: ["./src/components/component1/component1.html"],
    CssSelector: ["./src/components/component1/component1.css"]
  };
  class component1 extends yajouraComponent {
    constructor() {
      super(selectorComponent1);
    }
}
export { component1, selectorComponent1};