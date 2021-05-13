import React, { useEffect, useState } from "react";

// reactstrap components
import {     
    FormGroup,    
    Input,          
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    Fade,
    UncontrolledTooltip,  
    Badge } from "reactstrap";

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import useBaseURL from '../../Hooks/useBaseURL';

const cookie = new Cookies();

const RecordPatientModal= (props) => {
  const baseURL= useBaseURL(null);
  const {
      idTreatment,
      nameTreatment               
      } = props;
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const [ phrase, setPhrase] = useState([]);

    
//metodo Sincronico para el consumo del login en la api
  const Phrases = async()=>{  
    setModalOpen(!modalOpen);

    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL+'api/phrasePatientTreatment/'+idTreatment)      
      .then(response =>{                         
        setPhrase(response.data.data);                
        console.log(phrase);
      })    
      .catch(err => {                            
        Swal.fire({
          title: 'Oops!!',
          text: "there is a problem connecting with Treatment the API server!",
          icon: "warning",
          footer: '<span style="color: red">server with error!<span/>',        
          toast: true,
          position: "top-right",        
          showConfirmButton: false,
          timer: 4000,
        })        
      })   
    })
  };
  


  return (
    <>
      <Button
        className=" btn-icon"
        color="info"
        size="sm"
        type="button"
        id={nameTreatment+"info"}
        onClick={() => Phrases()}
      >
      <i className=" ni ni-headphones pt-1"></i>
      
      <UncontrolledTooltip 
          delay={idTreatment}
          target={nameTreatment+"info"}
          >
          info
          </UncontrolledTooltip> 
      </Button>



      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            { nameTreatment }
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
              <ol>
              {
                phrase.map( item =>(
                  <> 
                    <li key={item.id} color="primary">                    
                      <label  htmlFor="exampleFormControlTextarea1">
                        {item.phrase}
                      </label>    

                      
                      <Button
                        className=" btn-icon"
                        color="primary"
                        size="sm"
                        type="button"  
                        placement="right"                                                                      
                      >
                      <i className=" ni ni-sound-wave pt-1"></i>
                      
                      </Button>

                    </li>
                  </>
                ))
              }
              </ol>
                
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
          <Button color="primary" type="button" >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RecordPatientModal;