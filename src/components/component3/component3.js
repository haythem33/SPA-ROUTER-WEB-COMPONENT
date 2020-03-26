import { yajouraComponent } from "../../Yajoura_componet/Yajoura";
let selectorComponent3 = {
  Componentselector: ["component3-component"],
  HtmlSelector: ["./src/components/component3/component3.html"],
  CssSelector: ["./src/components/component3/component3.css"]
};
class component3 extends yajouraComponent {
  constructor() {
    super(selectorComponent3);
  }
}
export { component3, selectorComponent3 };
