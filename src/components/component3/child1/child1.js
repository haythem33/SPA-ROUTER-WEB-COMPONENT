import { yajouraComponent } from "../../../Yajoura_componet/Yajoura";
let selectorChild1 = {
    Componentselector: ["child1-component"],
    HtmlSelector: ["./src/components/component3/child1/child1.html"],
    CssSelector: ["./src/components/component3/child1/child1.css"]
};
class child1 extends yajouraComponent {
    constructor() {
     super(selectorChild1);
    }
}
export {child1 , selectorChild1};