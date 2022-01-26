import React, { useState, useEffect } from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Fade,
  Badge,
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../Hooks/useBaseURL';

const cookie = new Cookies();


const ShowPhraseModal = (props) => {
 
  const {
     buttonLabel, 
     patient,
     idTreatment
        } = props;
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  const [listPhrase, setlistPhrase] = useState(["lolo", "lili"]);
  
  //Captura los valores del formulario
  const handlePhraseChange = async () => {
    setModalOpen(!modalOpen)

    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');
    await axios.get(baseURL + 'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL + 'api/getPatientTreat', {
        params: {
          idpatient: patient,
          idTreatment: idTreatment
        }
      })
        .then(response => {
          //console.log(response);
          setlistPhrase(response.data.data);
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


  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
     
      <Button
        className=" btn-icon"
        color="info"
        size="sm"
        type="button"
        onClick={() => handlePhraseChange()}
      >
        <i className="ni ni-bullet-list-67 pt-1"></i>
      </Button>

      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {buttonLabel}
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
            <ul>
            {listPhrase.map((item, index) => (
              <Fade tag="h3" className="mt-3" key={index}>
                <lo>
                  {index+1}{"_"}{item.phrase}
                </lo>
              </Fade>
            ))}
            </ul>
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
         
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ShowPhraseModal;
