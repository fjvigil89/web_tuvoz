import React, { useState } from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import useBaseURL from "../../Hooks/useBaseURL";
const cookie = new Cookies();
const RegisterPatientsModal = (props) => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  const { buttonLabel } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const [emailRegister, setEmailRegister] = useState({
    email: "",
  });

  const setEmailRegisterPatiente = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      axios
        .post(baseURL + "api/setEmailRegisterPatient", {
          emailRegister: emailRegister.form.email,
        })
        .then((response) => {
          console.log(response);
          //setListPatients(response.data.data);
        })
        .catch((err) => {
          Swal.fire({
            title: "Oops!!",
            text: "there is a problem connecting with Treatment the API server!",
            icon: "warning",
            footer: '<span style="color: red">server with error!<span/>',
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 4000,
          });
        });
    });
  };

  //Captura los valores del formulario
  const handleEmailRegisterChange = async (e) => {
    await setEmailRegister({
      form: {
        ...emailRegister.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <Button
        className="btn-icon btn-3"
        outline
        color="secondary"
        type="text"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <span className="btn-inner--icon">
          <i className="ni ni-fat-add" />
        </span>
        <span className="btn-inner--text"> {buttonLabel} </span>
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
            <label htmlFor="exampleFormControlTextarea1">
              Se enviará un email con un identificativo para que el paciente se
              registre
            </label>

            <Input
              className=" form-control-alternative"
              id="email"
              name="email"
              placeholder="paciente@email"
              type="email"
              onChange={handleEmailRegisterChange}
            ></Input>
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
          <Button
            color="primary"
            type="button"
            onClick={() => setEmailRegisterPatiente()}
          >
            Enviar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegisterPatientsModal;
