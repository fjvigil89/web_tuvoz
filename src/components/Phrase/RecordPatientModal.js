import React, { useState } from "react";

// reactstrap components
import {     
    FormGroup,  
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter,
    UncontrolledTooltip,  
     } from "reactstrap";

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import useBaseURL from '../../Hooks/useBaseURL';
import Recorded from 'components/Recorded/Recorded';

const cookie = new Cookies();

const RecordPatientModal= (props) => {

  const baseURL= useBaseURL(null);
  const {
      idPhrase,
      namePhrase,                     
      } = props;
  
  const [modalOpen, setModalOpen] = React.useState(false);
  
 
  const addRecord = async()=>{           
    const audioUrl = cookie.get('audioURL');      
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');       
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
            axios.post(baseURL+"api/record",{
              record: audioUrl,
              idPhrase: idPhrase,              
            },
            {
              headers: {
                'x-test-header': 'test-header-value',
                "Access-Control-Allow-Origin": "*",        
              },
            })
            .then(response =>{                                                              
                cookie.remove('audioURL', {path: '/'}); 
                Swal.fire({
                    title: 'Woww!!',
                    text: response.data.message,
                    icon: "success",
                    footer: '<span style="color: blue">Thanks!<span/>',        
                    toast: true,
                    position: "top-right",        
                    showConfirmButton: false,
                    timer: 4000,
                  });                
                
                
            })  
            .catch(()=>{                      
                Swal.fire({
                  title: 'Hoops!!',
                  text: "Debe Grabar el Audio Primero",
                  icon: "warning",
                  footer: '<span style="color: red">Thanks!<span/>',        
                  toast: true,
                  position: "top-right",        
                  showConfirmButton: false,
                  timer: 4000,
                });                              
            });
            
            
        });    
  }

  return (
    <>     
        <Button
          className=" btn-icon"
          color="info"
          size="sm"
          type="button"
          id={idPhrase+"info"}  
          onClick={() => setModalOpen(!modalOpen)}                              
        >
        <i className=" ni ni-headphones pt-1"></i>        
          
        </Button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>                
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Grabar Frases
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
            <FormGroup>
              <label> { namePhrase } </label>
                <Recorded></Recorded>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button color="primary" type="button" 
            onClick = {(e) => addRecord() }
           >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RecordPatientModal;