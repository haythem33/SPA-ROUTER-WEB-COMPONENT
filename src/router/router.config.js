import { component3, selectorComponent3 } from "../components/component3/component3.js";
import { component2, selectorComponent2 } from "../components/component2/component2.js";
import { component1, selectorComponent1 } from "../components/component1/component1.js";
import { child1, selectorChild1 } from "../components/component3/child1/child1.js";
import { child2, selectorChild2 } from "../components/component3/child2/child2.js";
import { defineAllComponent } from "../Yajoura_componet/Yajoura.js";
export const routes = [
  {
    path: "/component1",
    component: component3,
    selector: selectorComponent3,
    children: [
      {
        path: "/child1",
        component: child1,
        selector: selectorChild1,
        children : [
          {
            path : '/child2',
            component : child2,
            selector : selectorChild2

          }
        ]
      }
    ]
  },
  {
    path: "/component2/:params",
    component: component2,
    selector: selectorComponent2
  },
  {
    path: "/",
    component: component1,
    selector: selectorComponent1,
  }
];
defineAllComponent(routes);