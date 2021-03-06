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
import React from "react";
// reactstrap components

// core components
import SpecialistHeader from "components/Specialist/Headers/SpecialistHeader";
import AdminHeader from "components/Admin/Headers/AdminHeader";
import SpecialistTableList from "components/Specialist/Treatment/SpecialistTableList";
import AdminTableList from "components/Admin/Treatment/AdminTableList";
import Cookies from 'universal-cookie';


const cookie = new Cookies();

const Treatments = () => {
   

  return (
    <>
      
      {
        cookie.get('role') === "Admin" ? <AdminHeader/> :  <SpecialistHeader/> 
      }   
      {/* Page content */}
      {
        cookie.get('role') === "Admin" ? <AdminTableList/> :  <SpecialistTableList/> 
      }

    </>
  );
};

export default Treatments;
