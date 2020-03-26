import { yajouraComponent} from "../../Yajoura_componet/Yajoura";
let selectorComponent2 = {
  Componentselector: ["component2-component"],
  HtmlSelector: ["./src/components/component2/component2.html"],
  CssSelector: ["./src/components/component2/component2.css"]
};
class component2 extends yajouraComponent {
    constructor() {
      super(selectorComponent2);
    }
}
export { component2, selectorComponent2};
