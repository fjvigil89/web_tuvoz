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
import Header from "components/Specialist/Headers/SpecialistHeader";
import ListPatientTable from "./ListPatientTable";
import { useParams } from "react-router";

const ListPatient = () => {
   
  let { id, name }= useParams();  
  return (
    <>
      <Header />      
      {/* Page content */}        
      <ListPatientTable
        idTreatment = {id}
        nameTreatment = {name}
      >

      </ListPatientTable>
 
    </>
  );
};

export default ListPatient;
