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
import React, { useState } from "react";
// reactstrap components
// reactstrap components
import {         
    Button, 
} from "reactstrap";

// core components
import Cookies from 'universal-cookie';
import useRecorder from "../../Hooks/useRecorder";

const cookie = new Cookies();
const Recorded = () => {

   let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

   let color = !isRecording ? "default" : "danger";    
     
   
   cookie.set('audioURL', audioURL , {path: '/', maxAge: '10800'}); 
   
   
  return (
    <>
      <div>        
        <audio src={audioURL} controls />          
        <Button
        className=" btn-icon"
        color="primary"
        size="lg"
        type="button"  
        onClick={startRecording}
        disabled={isRecording}
        >
            <i className=" ni ni-sound-wave pt-1"></i>
        
        </Button>        
        <Button
        className=" btn-icon"
        color={color}
        size="lg"
        type="button"  
        onClick={stopRecording} 
        disabled={!isRecording}
        >
            <i className=" ni ni-fat-remove pt-1"></i>
        
        </Button>     
        </div>        
    </>    
  );  
};

export default Recorded;