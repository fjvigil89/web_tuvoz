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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import useBaseURL from "../../Hooks/useBaseURL";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import RegisterPolicy from "./RegisterPolicyModal";

const cookie = new Cookies();

function validateFormRegister(name, passwd) {
  if (name === undefined || name.length === 0) {
    Swal.fire({
      title: "Oops!!",
      text: "El campo nombre no puede estar en blanco!",
      icon: "error",
      footer: '<span style="color: red">server with error!<span/>',
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 4000,
    });
    return false;
  }

  if (passwd === undefined || passwd.length < 6) {
    Swal.fire({
      title: "Oops!!",
      text: "El campo password tiene que tener más de 6 caracteres!",
      icon: "error",
      footer: '<span style="color: red">server with error!<span/>',
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 4000,
    });

    return false;
  }

  return true;
}

const Register = () => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  //hoocks para el uso de las credenciales
  const { email } = useParams();
  const [shown, setShown] = React.useState(false);
  const [reshown, setReshown] = React.useState(false);

  const [eyes, setEyes] = React.useState("fa fa-eye");
  const [reyes, setReyes] = React.useState("fa fa-eye");

  const [register, setRegister] = useState({
    name: "",
    email: email,

    password: "",
    repassword: "",
  });

  const [checkBox, setCheckBox] = useState(false);
  const handlePolicy = async (e) => {
    //e.preventDefault();
    setCheckBox(!checkBox);
  };

  //Captura los valores del formulario
  const handleChange = async (e) => {
    await setRegister({
      form: {
        ...register.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const switchShown = (e) => {
    e.preventDefault();
    setShown(!shown);
    if (!shown) {
      setEyes("fa fa-eye-slash");
    } else {
      setEyes("fa fa-eye");
    }
  };
  const switchReshown = (e) => {
    e.preventDefault();
    setReshown(!reshown);
    if (!reshown) {
      setReyes("fa fa-eye-slash");
    } else {
      setReyes("fa fa-eye");
    }
  };

  //metodo Sincronico para el consumo del login en la api
  const setRegisterpatient = async () => {
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      register.email = email;
      register.name =
        register.form !== undefined ? register.form.name : register.name;
      register.password =
        register.form !== undefined
          ? register.form.password
          : register.password;
      register.repassword =
        register.form !== undefined
          ? register.form.repassword
          : register.repassword;

      if (register.form.password === register.form.repassword) {
        if (validateFormRegister(register.name, register.password)) {
          // Login...
          //console.log(register);
          axios
            .post(
              baseURL + "api/register",
              {
                email: email,
                name: register.form.name,
                password: register.form.password,
              },
              {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            )
            .then((response) => {
              return response;
            })
            .then((response) => {
              console.log(response);
              if (
                response.status === 200 &&
                response.data.data.role !== "Guest"
              ) {
                let data = response.data.data;
                let token = response.data.access_token;
                cookie.set("token", token, { path: "/", maxAge: "10800" });
                cookie.set("id", data.id, { path: "/", maxAge: "10800" });
                cookie.set("email", data.email, { path: "/", maxAge: "10800" });
                cookie.set("name", data.name, { path: "/", maxAge: "10800" });
                cookie.set("role", data.role, { path: "/", maxAge: "10800" });

                if (data.role === "Specialist" && data.status) {
                  window.location.href = "/admin/index";
                }
              } else {
                let data = response.data.data;
                if (data.role === "Guest" && data.status) {
                  window.location.href = "/auth/guest_register";
                }
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: "Oops!!",
                text: "Las Credenciales están mal!",
                icon: "error",
                footer: '<span style="color: red">server with error!<span/>',
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
              });
            });
        }
      } else {
        Swal.fire({
          title: "Oops!!",
          text: "Las Credenciales no Coinciden!",
          icon: "error",
          footer: '<span style="color: red">server with error!<span/>',
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 4000,
        });
      }
    });
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="name"
                    placeholder="Name"
                    type="text"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    ofline
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type={shown ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={handleChange}
                    minLength="6"
                  />
                  <InputGroupAddon
                    addonType="prepend"
                    onClick={(e) => switchShown(e)}
                  >
                    <InputGroupText>
                      <i className={eyes} />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="repassword"
                    placeholder="Password"
                    type={reshown ? "text" : "password"}
                    autoComplete="repite-password"
                    onChange={handleChange}
                    minLength="6"
                  />
                  <InputGroupAddon
                    addonType="prepend"
                    onClick={(e) => switchReshown(e)}
                  >
                    <InputGroupText>
                      <i className={reyes} />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onClick={handlePolicy}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        <RegisterPolicy buttonLabel="Privacy Policy"></RegisterPolicy>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                {!checkBox ? (
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled
                  >
                    Create account
                  </Button>
                ) : (
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={setRegisterpatient}
                  >
                    Create account
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
