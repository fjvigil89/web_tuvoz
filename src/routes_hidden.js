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

import AddTreatments from "views/Treatment/AddTreatments";
import ListPhrase from "views/Patient/Phrases";
import ListPatient from "components/Patient/ListPatient";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import GuestRegister from "views/Patient/GuestRegister.js";
var routes_hidden = [
  {
    path: "/addtreatment",
    name: "AddTreatment",
    component: AddTreatments,
    layout: "/admin",
  },
  {
    path: "/listPatient/:id/:name",
    name: "ListPatient",
    component: ListPatient,
    layout: "/admin",
  },
  {
    path: "/user-profile/:id",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/register/:email",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/listPhrase/:id",
    name: "listPhrase",
    component: ListPhrase,
    layout: "/patient",
  },
  {
    path: "/guest_register",
    name: "GuestRegister",
    component: GuestRegister,
    layout: "/auth",
  },
];
export default routes_hidden;
