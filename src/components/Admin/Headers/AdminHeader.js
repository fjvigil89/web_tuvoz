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
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import useBaseURL from '../../../Hooks/useBaseURL';
import Swal from 'sweetalert2';

const cookie = new Cookies();

//inicio de la función
const AdminHeader = () => {
  

  //uso del Hooks para la url de la API
  const baseURL= useBaseURL(null);
  
 const [treatment, setTreatment]  = useState(0);
 const [userbytreatment, setUserByTreatment]  = useState(0);
 const [countRecord, setCountRecord]  = useState(0);

  //metodo Sincronico para el consumo del login en la api
  const countGetTreatment = async()=>{    
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL+'api/countGetTreatment')      
      .then(response =>{                    
        //console.log(response);
        setTreatment(response.data);
      })    
      .catch(() => {            
        Swal.fire({
          title: 'Oops!!',
          text: "there is a problem connecting the API server!",
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
  
    //metodo Sincronico para el consumo del login en la api
    const countGetUser = async()=>{    
      axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
      await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
        // get Tratamientos
        axios.get(baseURL+'api/countGetUser')      
        .then(response =>{                        
          setUserByTreatment(response.data);
        })    
        .catch(() => {            
          Swal.fire({
            title: 'Oops!!',
            text: "there is a problem connecting the API server!",
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

    //metodo Sincronico para el consumo del login en la api
    const countGetRecord = async()=>{    
      axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
      await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
        // get Tratamientos
        axios.get(baseURL+'api/countGetRecord')      
        .then(response =>{                        
          setCountRecord(response.data);
        })    
        .catch(() => {            
          Swal.fire({
            title: 'Oops!!',
            text: "there is a problem connecting the API server!",
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

  useEffect(()=>{            
    countGetTreatment()
    countGetUser()
    countGetRecord()
    
  },[]);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <Link to="/admin/voces/">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Voces
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            { countRecord.data }
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="ni ni-sound-wave " />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 100%
                        </span>{" "}
                        <span className="text-nowrap">Hoy</span>
                      </p>
                    </CardBody>
                    </Link>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                <Link to="/admin/patients/">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Usuarios
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{ userbytreatment.data }</span>
                      </div>                      
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 100 %
                      </span>{"  "}
                      <span className="text-nowrap">Hoy</span>
                    </p>
                  </CardBody>
                </Link>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                <Link to={"/admin/treatments/"}> 
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tratamientos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {treatment.data}</span>
                      </div>                      
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 100 %
                      </span>{" "}
                      <span className="text-nowrap">Hoy</span>
                    </p>
                  </CardBody>
                </Link>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Demo
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminHeader;
