/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Index from "views/examples/Patient/Index.js"
import Treatments from "views/examples/Patient/Treatments.js"

var routes_patient = [  
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-circle-08 text-pink",
    component: Index,
    layout: "/patient",
  },
  {
    path: "/treatments",
    name: "Treatments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Treatments,
    layout: "/patient",
  }, 
];
export default routes_patient;
