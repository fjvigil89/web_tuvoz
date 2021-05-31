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

import { useEffect, useState } from "react";
import useBaseURL from '../../Hooks/useBaseURL';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

const cookie = new Cookies();
//Funcion Base para la paguina del Login
const Login = () => {

  
  //uso del Hooks para la url de la API
  const baseURL= useBaseURL(null);

  //hoocks para el uso de las credenciales

  const [credenciales, setCredenciales] = useState({
  email: '',
  password: ''
})

// Similar a componentDidMount y componentDidUpdate:
useEffect(() => {    
  if(cookie.get('token')){
    if (cookie.get('role') === 'Specialist') {
      window.location.href = "/admin/index";
    }    
    if (cookie.get('role') === 'Guest') {
      window.location.href = "/patient/index";      
    }
    
  }  

}, []);


//Captura los valores del formulario
const handleChange = async e =>{  
  await setCredenciales({        
    form:{
      ...credenciales.form,
      [e.target.name]: e.target.value
    }
  
  });  
}

//metodo Sincronico para el consumo del login en la api
const inicioSesion = async()=>{    
  await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
    // Login...
    axios.post(baseURL+'api/login', {      
        email: credenciales.form.email, 
        password: credenciales.form.password 
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',        
          "Access-Control-Allow-Origin": "*",        
        },
      })
    .then(response =>{             
      return response;
    })
    .then(response=>{     
      if (response.statusText === 'OK') { 
            let data = response.data.data;
            let token = response.data.access_token;
            cookie.set('token', token, {path: '/', maxAge: '10800'}); 
            cookie.set('id', data.id, {path: '/', maxAge: '10800'});
            cookie.set('email', data.email, {path: '/', maxAge: '10800'});
            cookie.set('name', data.name, {path: '/', maxAge: '10800'}); 
            cookie.set('role', data.role, {path: '/', maxAge: '10800'}); 
            
            if (data.role === 'Specialist') {
              window.location.href = "/admin/index";
            }
            if (data.role === 'Guest') {
              window.location.href = "/patient/index";      
            }

            
      }
    })
    .catch(() => {         
      Swal.fire({
        title: 'Oops!!',
        text: "Credentials went wrong!",
        icon: "error",
        footer: '<span style="color: red">server with error!<span/>',        
        toast: true,
        position: "top-right",        
        showConfirmButton: false,
        timer: 4000,
      }) 
    })
  }); 
};


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email" 
                    name = 'email'
                    onChange= { handleChange }
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
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name='password'
                    onChange= { handleChange }
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={ inicioSesion }>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
