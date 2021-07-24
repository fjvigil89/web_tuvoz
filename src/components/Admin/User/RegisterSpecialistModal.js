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
import useBaseURL from "../../../Hooks/useBaseURL";
const cookie = new Cookies();

const RegisterSpecialistModal = (props) => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  const { buttonLabel } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const [emailRegister, setEmailRegister] = useState({
    email: "",
  });

  const setEmailRegisterSpecialist = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      axios
        .post(baseURL + "api/setEmailRegisterSpecialist", {
          emailRegister: emailRegister.form.email,
          uri_register: window.location.origin + "/auth/register",
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Woww!!",
              text: response.data.message,
              icon: "success",
              footer: '<span style="color: blue">Thanks!<span/>',
              toast: true,
              position: "top-right",
              showConfirmButton: false,
              timer: 4000,
            });
            setModalOpen(!modalOpen);
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Oops!!",
            text: "there is a problem connecting with the API server!",
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
              placeholder="specialist@email"
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
            onClick={() => setEmailRegisterSpecialist()}
          >
            Enviar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegisterSpecialistModal;
