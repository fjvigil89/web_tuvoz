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
import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Treatments from "views/examples/Treatments.js";
import Icons from "views/examples/Icons.js";
import Patients from "views/examples/Patients";
import Voces from "views/examples/Voces.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },  
  {
    path: "/treatments",
    name: "Treatments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Treatments,
    layout: "/admin",
  }, 
  {
    path: "/patients",
    name: "Pacientes",
    icon: "fas fa-users text-info",    
    component: Patients,
    layout: "/admin",
  }, 
  {
    path: "/voces",
    name: "Voces",
    icon: "ni ni-sound-wave text-blue",    
    component: Voces,
    layout: "/admin",
  },  
];
export default routes;
