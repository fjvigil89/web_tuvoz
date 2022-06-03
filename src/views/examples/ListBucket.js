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
import BucketS3 from "components/Specialist/BucketS3/BucketS3TableList";


import Cookies from 'universal-cookie';


const cookie = new Cookies();

const ListBucket = () => {
   

  return (
    <>
      
       <SpecialistHeader/> 
       <BucketS3/> 
       
    </>
  );
};

export default ListBucket;
