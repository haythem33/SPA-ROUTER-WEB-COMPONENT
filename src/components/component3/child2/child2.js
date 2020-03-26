import { yajouraComponent } from "../../../Yajoura_componet/Yajoura";
let selectorChild2 = {
  Componentselector: ["child2-component"],
  HtmlSelector: ["./src/components/component3/child2/child2.html"],
  CssSelector: ["./src/components/componenet3/child2/child2.css"]
}
class child2 extends yajouraComponent {
    constructor() {
        super(selectorChild2)
    }
}
export {child2 , selectorChild2};